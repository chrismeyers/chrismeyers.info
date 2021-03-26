const createProjectRepository = (loader) => {
  const active = async () => {
    const data = await loader('projects');
    return data.filter((p) => p.active);
  };

  const findById = async (id) => {
    const data = await loader('projects');
    return data.find((p) => p.id === id && p.active);
  };

  return { active, findById };
};

module.exports = createProjectRepository;
