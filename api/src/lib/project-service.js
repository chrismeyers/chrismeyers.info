const createProjectService = (projects) => {
  const active = () => projects.filter((p) => p.active);

  const findById = (id) => projects.find((p) => p.id === id && p.active);

  return { active, findById };
};

module.exports = createProjectService;
