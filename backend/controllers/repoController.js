const createRepository = (req, res) => {
  res.send("Repository created!");
};
const getAllRepositories = (req, res) => {
  res.send("All Repositories fetched!");
};

const fetchrepositoryById = (req, res) => {
  res.send("Repository Details fetched!");
};

const fetchRepositoryByName = (req, res) => {
  res.send("Repository Details fetched!");
};

const fetchRepositoryForCurrentUser = (req, res) => {
  res.send("Repository for logged in user fetched!");
};

const updateRepositoryById = (req, res) => {
  res.send("Repository Updated!");
};

const toggleVisibiltyById = (req, res) => {
  res.send("Visibilty toggled!");
};

const deleteRepositoryById = (req, res) => {
  res.send("Repository Deleted!");
};



module.exports={
  createRepository,
  deleteRepositoryById,
  fetchRepositoryByName,
  fetchRepositoryForCurrentUser,
  fetchrepositoryById,
  toggleVisibiltyById,
  getAllRepositories,
  updateRepositoryById,
}