import PageTransition from '@/scripts/transitions/PageTransition';
const pageTransition = new PageTransition();

type modeOptions = "default" | "out-in" | "in-out";

export default {
	name: 'default',
	mode: "out-in" as modeOptions,
	onBeforeEnter: (el) => {
		pageTransition.onBeforeEnter(el);
	},
	onEnter: (el, done) => {
		pageTransition.onEnter(el, done);
	},
	onAfterEnter: (el) => {
		pageTransition.onAfterEnter(el);
	},
	onBeforeLeave: (el) => {
		pageTransition.onBeforeLeave(el);
	},
	onLeave: (el, done) => {
		pageTransition.onLeave(el, done);
	},
	onAfterLeave: (el) => {
		pageTransition.onAfterLeave(el);
	},
	onEnterCancelled: (el) => {
		pageTransition.onEnterCancelled(el);
	},
	onLeaveCancelled: (el) => {
		pageTransition.onLeaveCancelled(el);
	},
};