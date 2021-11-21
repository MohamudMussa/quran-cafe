import { STATUS, instance as Supabase } from "./supbase";

class Playlists {
  constructor() {
    this.data = null;
    this.status = STATUS.idle;
    this.error = null;
  }

  async getAll() {
    const { data, error } = await Supabase.db.from("playlist").select("*");
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
      .from("playlist")
      .select("*")
      .eq("id", id);
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

export default Playlists;
