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
      .select("video_url");
    if (error) {
      this.error = errror;
      this.status = STATUS.rejected;
      throw new Error(error);
    }
    this.data = data;
    this.status = STATUS.resolved;

    return this.data;
  }
}

export default Recitations;
