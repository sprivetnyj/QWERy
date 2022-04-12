import replace from "gulp-replace";
import browsersync from "browser-sync";
import newer from "gulp-newer";
import ifPlugin from "gulp-if";

export const plugins = {
	replace: replace,
	browsersync: browsersync,
	newer: newer,
	if: ifPlugin
}