import { DiamondDrawer } from "./src/diamond-drawer";

const drawer = new DiamondDrawer('ABCDEFGHIJKLMNOPQRSTUVWXYZ', '-');
const diamondLines = drawer.draw('Z');

diamondLines.forEach(line => {
    console.log(line);
});