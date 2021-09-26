import { STATUS, instance as Supabase } from './supbase';

class Recitations {
	constructor() {
		this.data = null;
		this.status = STATUS.idle;
		this.error = null;
	}

	async getAll() {
		const { data } = await Supabase.db.from('recitations').select('id');
		this.data = data;
		this.status = STATUS.resolved;
		console.log(this.data);
	}
}

export default Recitations;
