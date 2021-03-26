const createProjectRepository = (loader) => {
  const active = async () => {
    const data = await loader('builds');
    return data.filter((b) => b.active);
  };

  const findById = async (id) => {
    const data = await loader('builds');
    return data.find((b) => b.id === id && b.active);
  };

  return { active, findById };
};

module.exports = createProjectRepository;
