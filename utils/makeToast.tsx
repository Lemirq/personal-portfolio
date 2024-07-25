import { toast } from 'react-hot-toast';

const makeToast = (message: string, type: 'success' | 'danger') => {
	toast(message, {
		icon: type === 'success' ? '👍' : '👎',
		style: {
			borderRadius: '10px',
			background: '#333',
			color: '#fff',
		},
	});
};

export default makeToast;
