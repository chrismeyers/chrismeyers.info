const createProjectService = (builds) => {
  const active = () => builds.filter((b) => b.active);

  const findById = (id) => builds.find((b) => b.id === id && b.active);

  return { active, findById };
};

module.exports = createProjectService;
