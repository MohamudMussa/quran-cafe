class Plausible {
  async getListeners() {
    const res = await fetch(
      "https://plausible.io/api/v1/stats/realtime/visitors?site_id=quran.cafe",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer oAKMgrmuVJUUJQ6lq-xfAMfm59qj8LfNqRzJ8kH2cYg5FfbW6cgaTKKaPLU6ydAV",
        },
      }
    );
    const json = await res.json();
    return {
      count: json,
    };
  }
}

export const instance = new Plausible();

module.exports = {
  instance,
  Plausible,
};
