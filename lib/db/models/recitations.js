import { STATUS, instance as Supabase } from "./supbase";

class Recitations {
  constructor() {
    this.data = null;
    this.status = STATUS.idle;
    this.error = null;
  }

  async getAll() {
    const { data, error } = await Supabase.db
      .from("recitations")
      .select("video_url, id, up_vote");
    if (error) {
      this.error = error;
      this.status = STATUS.rejected;
      throw new Error(error);
    }
    this.data = data;
    this.status = STATUS.resolved;

    return this.data;
  }

  async getById(id) {
    const { data, error } = await Supabase.db
      .from("recitations")
      .select("*")
      .where({ id });
    if (error) {
      this.error = error;
      this.status = STATUS.rejected;
      throw new Error(error);
    }
    this.data = data;
    this.status = STATUS.resolved;

    return this.data;
  }

  async incrementUpvoteById(id, up_vote) {
    const { data, error } = await Supabase.db
      .from("recitations")
      .update({ up_vote })
      .match({ id });
    if (error) {
      this.error = error;
      this.status = STATUS.rejected;
      throw new Error(error);
    }
    this.data = data;
    this.status = STATUS.resolved;

    return this.data;
  }
}

export default Recitations;
