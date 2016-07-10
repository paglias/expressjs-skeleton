const api = {};

api.example = {
  method: 'GET',
  url: '/example',
  middlewares: [],
  async handler (req, res) {
    let val = await Promise.resolve('Success!');
    res.status(200).json({val});
  },
};

export default api;