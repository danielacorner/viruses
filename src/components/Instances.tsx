import React, {
	useRef,
	useMemo,
	useState,
	useEffect,
	useImperativeHandle,
} from "react";
// https://spectrum.chat/react-three-fiber/general/using-instancedmesh-declaratively~470dbd71-8c1e-49a9-a96d-8d0c588222bf
let uuid = 0;
export let context = React.createContext({
	ref: null as any,
	update: null as any,
	instances: null as any,
});
export function Instances({ children }) {
	const ref = useRef(null as any);
	const [ticker, set] = useState(0);
	const instances = useRef({});
	const api = useMemo(
		() => ({ ref, update: () => set((state) => state + 1), instances }),
		[]
	);
	const count = Object.keys(instances.current).length;

	useEffect(() => {
		Object.values(instances.current).forEach((matrix, index) =>
			ref.current.setMatrixAt(index, matrix)
		);
		ref.current.instanceMatrix.needsUpdate = true;
	}, [count, ticker]);

	return (
		<context.Provider value={api}>
			<instancedMesh key={count} ref={ref} args={[null, null, count || 1]}>
				{children}
			</instancedMesh>
		</context.Provider>
	);
}

export const Instance = React.forwardRef(
	({ children, ...props }, forwardRef) => {
		const [id] = useState(() => uuid++);
		const group = useRef(null as any);
		const { ref, update, instances } = React.useContext(context as any);

		useEffect(() => {
			group.current.updateMatrixWorld();
			instances.current[id] = group.current.matrixWorld;
			update();
			return () => delete instances.current[id];
		}, []);

		useImperativeHandle(forwardRef, () => ({
			position: group.current?.position,
			scale: group.current?.scale,
			rotation: group.current?.rotation,
			update: () => {
				// todo: optimize into a static object lookup
				Object.keys(instances.current).forEach((key, index) => {
					if (String(key) === String(id)) {
						group.current.updateMatrixWorld();
						ref.current.setMatrixAt(index, group.current.matrixWorld);
					}
				});
				ref.current.instanceMatrix.needsUpdate = true;
			},
		}));

		return (
			<group ref={group} {...props}>
				{children}
			</group>
		);
	}
) as any;
