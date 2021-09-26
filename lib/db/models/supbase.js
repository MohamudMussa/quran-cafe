import { createClient as createSupabaseClient } from '@supabase/supabase-js';

export const STATUS = {
	idle: 'idle',
	rejected: 'rejected',
	resolved: 'resolved',
};

class Supabase {
	constructor() {
		this.db = createSupabaseClient(
			'https://awstscurqptrsqnliiln.supabase.co',
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzMjA0NTIyMCwiZXhwIjoxOTQ3NjIxMjIwfQ.5R4sUN_wYVS3-J963FCxnB9GInv2BInpgV0MhxYtpFs',
		);
		this.status = STATUS.idle;
		this.error = null;
	}
}

export const instance = new Supabase();

export default Supabase;
