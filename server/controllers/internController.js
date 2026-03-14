const mongoose = require("mongoose");

const Intern = require("../models/Intern");
const asyncHandler = require("../middleware/asyncHandler");
const ApiError = require("../utils/ApiError");
const pickInternFields = require("../utils/pickInternFields");

const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const parsePositiveInteger = (value, fallback) => {
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};

const assertValidInternId = (id) => {
  if (!mongoose.isValidObjectId(id)) {
    throw new ApiError(400, "Invalid intern id");
  }
};

const createIntern = asyncHandler(async (req, res) => {
  const payload = pickInternFields(req.body);
  const intern = await Intern.create(payload);

  res.status(201).json({
    message: "Intern created successfully",
    data: intern
  });
});

const listInterns = asyncHandler(async (req, res) => {
  const page = parsePositiveInteger(req.query.page, 1);
  const limit = Math.min(parsePositiveInteger(req.query.limit, 8), 50);
  const search = String(req.query.search || "").trim();
  const role = String(req.query.role || "").trim();
  const status = String(req.query.status || "").trim();

  const query = {};

  if (search) {
    const pattern = new RegExp(escapeRegex(search), "i");
    query.$or = [{ name: pattern }, { email: pattern }];
  }

  if (role) {
    query.role = role;
  }

  if (status) {
    query.status = status;
  }

  const skip = (page - 1) * limit;

  const [interns, total] = await Promise.all([
    Intern.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Intern.countDocuments(query)
  ]);

  res.json({
    data: interns,
    pagination: {
      page,
      limit,
      total,
      totalPages: total === 0 ? 1 : Math.ceil(total / limit)
    }
  });
});

const getInternById = asyncHandler(async (req, res) => {
  assertValidInternId(req.params.id);

  const intern = await Intern.findById(req.params.id);

  if (!intern) {
    throw new ApiError(404, "Intern not found");
  }

  res.json({ data: intern });
});

const updateIntern = asyncHandler(async (req, res) => {
  assertValidInternId(req.params.id);

  const updates = pickInternFields(req.body);

  if (Object.keys(updates).length === 0) {
    throw new ApiError(400, "No valid intern fields were provided for update");
  }

  const intern = await Intern.findByIdAndUpdate(req.params.id, updates, {
    new: true,
    runValidators: true,
    context: "query"
  });

  if (!intern) {
    throw new ApiError(404, "Intern not found");
  }

  res.json({
    message: "Intern updated successfully",
    data: intern
  });
});

const deleteIntern = asyncHandler(async (req, res) => {
  assertValidInternId(req.params.id);

  const intern = await Intern.findByIdAndDelete(req.params.id);

  if (!intern) {
    throw new ApiError(404, "Intern not found");
  }

  res.json({ message: "Intern deleted successfully" });
});

module.exports = {
  createIntern,
  listInterns,
  getInternById,
  updateIntern,
  deleteIntern
};
