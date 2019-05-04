const countries = [
	{
		name: "china",
		id: 1,
		child: 1
	},
	{
		name: "america",
		id: 2,
		child: 2
	}
];

const proviences = {
	1: [
		{
			name: "jiangsu",
			id: 100,
			child: 100
		},
		{
			name: "shanghai",
			id: 101,
			child: 101
		}
	],
	2: [
		{
			name: "California",
			id: 102,
			child: 102
		}
	]
};

const cities = {
	100: [
		{
			name: "nanjing",
			id: 1000,
			child: 1000
		},
		{
			name: "suzhu",
			id: 1001,
			child: 1001
		}
	],
	101: [
		{
			name: "shanghai",
			id: 1002,
			child: 1002
		}
	],
	102: [
		{
			name: "Los Angeles",
			id: 1003,
			child: 1003
		}
	]
};

const districts = {
	1000: [
		{
			name: "qqq",
			id: 10000
		},
		{
			name: "www",
			id: 10001
		}
	],
	1001: [
		{
			name: "eee",
			id: 10002
		},
		{
			name: "rrr",
			id: 10003
		}
	],
	1002: [
		{
			name: "ttt",
			id: 10004
		}
	],
	1003: [
		{
			name: "yyy",
			id: 10005
		}
	]
};

const data = {
	country: countries,
	prov: proviences,
	city: cities,
	district: districts
};

export default data;
