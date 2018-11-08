import { paths } from "./paths";
AFRAME.registerSystem("userinput-debug", {
  tick() {
    const userinput = AFRAME.scenes[0].systems.userinput;
    if (userinput.get(paths.actions.logDebugFrame) || userinput.get(paths.actions.log)) {
      console.log(userinput);
      console.log("sorted", userinput.sortedBindings);
      console.log("actives", userinput.actives);
      console.log("masked", userinput.masked);
      console.log("devices", userinput.activeDevices);
      console.log("activeSets", userinput.activeSets);
      console.log("frame", userinput.frame);
      console.log("xformStates", userinput.xformStates);
      const { sortedBindings, actives, masked, xformStates } = userinput;
      for (const i in sortedBindings) {
        const sb = [];
        if (masked[i].length > 0) {
          const xform = xformStates[sortedBindings[i]];
          for (const j of masked[i]) {
            sb.push(JSON.stringify(sortedBindings[j]));
          }
        }

        console.log(
          "binding: ",
          i,
          "\n",
          sortedBindings[i],
          "\n",
          "dest: ",
          Object.values(sortedBindings[i].dest),
          "\n",
          "active: ",
          actives[i],
          "\n",
          "maskedBy: ",
          masked[i],
          "\n",
          sb.join("\n"),
          "\n"
        );
      }
    }
  }
});