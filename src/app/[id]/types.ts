// The server either responds with a 200 status code and a JSON object
// or it responds with a status code and a human readable error
interface BomAttachment {
	url: string;
	file_name: string;
}

interface BomItem {
	ItemNum: number;
	ItemRevID: number;
	ItemRevStr: string;
	ItemPN: string;
	ItemDesc: string;
	ItemStatus: string;
	QtyStr: string;
	attachments: BomAttachment[];
}
export interface Output {
	desc: string;
	warnings: string[];
	status: number;
	under_eco: boolean;
	rev_letter: string;
	bill_of_materials: BomItem[];
}
