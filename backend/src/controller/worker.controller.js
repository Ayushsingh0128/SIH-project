const { workerModel } = require("../Models/worker.model");

const getWorkers = async (req, res) => {
  try {
    const { profession, city } = req.query;
    let filter = { availability: { $ne: false } };

    if (profession) {
      filter.profession = profession;
    }

    const workers = await workerModel.find(filter).select("-password");

    return res.status(200).json({
      message: "Workers fetched successfully",
      count: workers.length,
      workers,
    });
  } catch (error) {
    console.error("GET WORKERS ERROR:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const getWorkerById = async (req, res) => {
  try {
    const worker = await workerModel.findById(req.params.id).select("-password");

    if (!worker) {
      return res.status(404).json({
        message: "Worker not found",
      });
    }

    return res.status(200).json({
      message: "Worker fetched successfully",
      worker,
    });
  } catch (error) {
    console.error("GET WORKER ERROR:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const updateWorkerProfile = async (req, res) => {
  try {
    const workerId = req.user._id;
    const updates = req.body;

    delete updates.password;

    const updatedWorker = await workerModel.findByIdAndUpdate(
      workerId,
      { $set: updates },
      { new: true }
    ).select("-password");

    if (!updatedWorker) {
      return res.status(404).json({ message: "Worker not found" });
    }

    return res.status(200).json({
      message: "Profile updated successfully",
      user: updatedWorker
    });
  } catch (error) {
    console.error("UPDATE WORKER PROFILE ERROR:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { getWorkers, getWorkerById, updateWorkerProfile };
