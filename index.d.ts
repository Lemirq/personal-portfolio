declare interface ExcludedDirectories {
	directoryName: string;
}

declare interface body {
	children: {
		marks: [];
		text: string;
		_key: string;
		_type: string;
	}[];
	_type: string;
	style: string;
	_key: string;
	markDefs: [];
}

declare interface project {
	invisible: boolean;
	title: string;
	order: number | null;
	headline: string;
	url: string;
	tech: {
		_ref: string;
		_type: string;
		_key: string;
	}[];
	body: body[];
	_id: string;
	mainImage: {
		asset: {
			_id: string;
			url: string;
		};
	};
}
declare interface about {
	heading: string;
	iknow: {
		_key: string;
		_ref: string;
		_type: string;
	}[];
	body: string;
	mainImage: {
		asset: {
			url: string;
			_id: string;
		};
	};
}

declare interface iknow {
	_id: string;
	title: string;
	img: string;
	className: string;
}

declare interface tech {
	techName: string;
	_id: string;
}
