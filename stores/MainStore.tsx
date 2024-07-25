import { createStore } from 'zustand/vanilla';

// const [season, setSeason] = useState<number>(0);
// const [episode, setEpisode] = useState<number>(1);
// const [source, setSource] = useState<number>(0);
// const [isInFuture, setIsInFuture] = useState<boolean>(false);
// const [isinDMCA, setIsInDMCA] = useState<boolean>(false);
// const [playerVisibility, setPlayerVisibility] = useState(false);

export type MainState = {
	mobile: boolean;
	projects: project[];
	directories: ExcludedDirectories[];
	about: about | null;
	navbarHidden: boolean;
	tech: tech[];
	iknow: iknow[];
};

export type MainActions = {
	setMobile: (value: boolean) => void;
	setProjects: (value: project[]) => void;
	setDirectories: (value: ExcludedDirectories[]) => void;
	setAbout: (value: about) => void;
	setNavbarHidden: (value: boolean) => void;
	setTech: (value: tech[]) => void;
	setIknow: (value: iknow[]) => void;
};

export type MainStore = MainState & MainActions;

export const defaultInitState: MainState = {
	mobile: false,
	projects: [],
	directories: [],
	about: null,
	navbarHidden: false,
	tech: [],
	iknow: [],
};

export const createMainStore = (initState: MainState = defaultInitState) => {
	return createStore<MainStore>()((set) => ({
		...initState,
		setMobile: (value: boolean) => set({ mobile: value }),
		setProjects: (value: project[]) => set({ projects: value }),
		setDirectories: (value: ExcludedDirectories[]) => set({ directories: value }),
		setAbout: (value: about) => set({ about: value }),
		setNavbarHidden: (value: boolean) => set({ navbarHidden: value }),
		setTech: (value: tech[]) => set({ tech: value }),
		setIknow: (value: iknow[]) => set({ iknow: value }),
	}));
};
