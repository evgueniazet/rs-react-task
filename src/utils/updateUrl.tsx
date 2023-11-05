const updateUrl = (page: number) => {
  const newUrl = window.location.pathname + `?page=${page}`;
  window.history.pushState({ page: page }, "", newUrl);
};

export default updateUrl;
