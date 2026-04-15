const mongoose = require("mongoose");
const Intern = require("../models/Intern");

const buildFilters = (query) => {
  const filters = {};

  if (query.search) {
    filters.$or = [
      { name: { $regex: query.search, $options: "i" } },
      { email: { $regex: query.search, $options: "i" } }
    ];
  }

  if (query.role) {
    filters.role = query.role;
  }

  if (query.status) {
    filters.status = query.status;
  }

  return filters;
};

const buildSort = (query) => {
  const allowedSortFields = ["name", "email", "role", "status", "score", "createdAt"];
  const sortBy = allowedSortFields.includes(query.sortBy) ? query.sortBy : "createdAt";
  const sortOrder = query.sortOrder === "asc" ? 1 : -1;

  return { [sortBy]: sortOrder };
};

const csvEscape = (value) => {
  if (value === null || value === undefined) return "";
  const stringValue = String(value);
  const escapedValue = stringValue.replace(/"/g, '""');
  return `"${escapedValue}"`;
};

const createIntern = async (req, res) => {
  try {
    const intern = await Intern.create(req.body);
    return res.status(201).json(intern);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: "Email already exists" });
    }

    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }

    return res.status(500).json({ message: "Failed to create intern" });
  }
};

const getInterns = async (req, res) => {
  try {
    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.min(Math.max(Number(req.query.limit) || 10, 1), 100);
    const skip = (page - 1) * limit;
    const filters = buildFilters(req.query);
    const sort = buildSort(req.query);

    const [interns, totalRecords] = await Promise.all([
      Intern.find(filters).sort(sort).skip(skip).limit(limit),
      Intern.countDocuments(filters)
    ]);

    return res.status(200).json({
      data: interns,
      pagination: {
        page,
        limit,
        totalRecords,
        totalPages: Math.ceil(totalRecords / limit) || 1
      }
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch interns" });
  }
};

const getInternKpis = async (req, res) => {
  try {
    const filters = buildFilters(req.query);

    const [kpiResult] = await Intern.aggregate([
      { $match: filters },
      {
        $group: {
          _id: null,
          totalInterns: { $sum: 1 },
          averageScore: { $avg: "$score" },
          acceptedCount: {
            $sum: {
              $cond: [{ $eq: ["$status", "Accepted"] }, 1, 0]
            }
          },
          interviewCount: {
            $sum: {
              $cond: [{ $eq: ["$status", "Interview"] }, 1, 0]
            }
          }
        }
      }
    ]);

    const totalInterns = kpiResult?.totalInterns || 0;
    const averageScore = totalInterns ? Number(kpiResult.averageScore.toFixed(1)) : 0;
    const acceptedCount = kpiResult?.acceptedCount || 0;
    const interviewCount = kpiResult?.interviewCount || 0;
    const acceptanceRate = totalInterns
      ? Number(((acceptedCount / totalInterns) * 100).toFixed(1))
      : 0;

    return res.status(200).json({
      totalInterns,
      averageScore,
      acceptedCount,
      interviewCount,
      acceptanceRate
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch KPI data" });
  }
};

const exportInternReport = async (req, res) => {
  try {
    const filters = buildFilters(req.query);
    const sort = buildSort(req.query);
    const interns = await Intern.find(filters).sort(sort);

    const headers = ["Name", "Email", "Role", "Status", "Score", "Created At", "Updated At"];
    const rows = interns.map((intern) =>
      [
        csvEscape(intern.name),
        csvEscape(intern.email),
        csvEscape(intern.role),
        csvEscape(intern.status),
        csvEscape(intern.score),
        csvEscape(intern.createdAt.toISOString()),
        csvEscape(intern.updatedAt.toISOString())
      ].join(",")
    );

    const csvContent = [headers.join(","), ...rows].join("\n");

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", 'attachment; filename="intern-report.csv"');
    return res.status(200).send(csvContent);
  } catch (error) {
    return res.status(500).json({ message: "Failed to export intern report" });
  }
};

const getInternById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid intern ID" });
    }

    const intern = await Intern.findById(req.params.id);

    if (!intern) {
      return res.status(404).json({ message: "Intern not found" });
    }

    return res.status(200).json(intern);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch intern" });
  }
};

const updateIntern = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid intern ID" });
    }

    const updatedIntern = await Intern.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!updatedIntern) {
      return res.status(404).json({ message: "Intern not found" });
    }

    return res.status(200).json(updatedIntern);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: "Email already exists" });
    }

    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }

    return res.status(500).json({ message: "Failed to update intern" });
  }
};

const deleteIntern = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid intern ID" });
    }

    const deletedIntern = await Intern.findByIdAndDelete(req.params.id);

    if (!deletedIntern) {
      return res.status(404).json({ message: "Intern not found" });
    }

    return res.status(200).json({ message: "Intern deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Failed to delete intern" });
  }
};

module.exports = {
  createIntern,
  getInterns,
  getInternKpis,
  exportInternReport,
  getInternById,
  updateIntern,
  deleteIntern
};
