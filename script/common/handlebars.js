export const initializeHandlebars = () => {
  registerHandlebarsHelpers();
  preloadHandlebarsTemplates();
};

function preloadHandlebarsTemplates() {
  const templatePaths = [
    "systems/dark-heresy-rt/template/sheet/actor/acolyte.html",
    "systems/dark-heresy-rt/template/sheet/actor/npc.html",
    "systems/dark-heresy-rt/template/sheet/actor/limited-sheet.html",

    "systems/dark-heresy-rt/template/sheet/actor/tab/abilities.html",
    "systems/dark-heresy-rt/template/sheet/actor/tab/combat.html",
    "systems/dark-heresy-rt/template/sheet/actor/tab/gear.html",
    "systems/dark-heresy-rt/template/sheet/actor/tab/notes.html",
    "systems/dark-heresy-rt/template/sheet/actor/tab/npc-notes.html",
    "systems/dark-heresy-rt/template/sheet/actor/tab/npc-stats.html",
    "systems/dark-heresy-rt/template/sheet/actor/tab/progression.html",
    "systems/dark-heresy-rt/template/sheet/actor/tab/psychic-powers.html",
    "systems/dark-heresy-rt/template/sheet/actor/tab/stats.html",

    "systems/dark-heresy-rt/template/sheet/mental-disorder.html",
    "systems/dark-heresy-rt/template/sheet/aptitude.html",
    "systems/dark-heresy-rt/template/sheet/malignancy.html",
    "systems/dark-heresy-rt/template/sheet/mutation.html",
    "systems/dark-heresy-rt/template/sheet/talent.html",
    "systems/dark-heresy-rt/template/sheet/trait.html",
    "systems/dark-heresy-rt/template/sheet/special-ability.html",
    "systems/dark-heresy-rt/template/sheet/psychic-power.html",
    "systems/dark-heresy-rt/template/sheet/critical-injury.html",
    "systems/dark-heresy-rt/template/sheet/weapon.html",
    "systems/dark-heresy-rt/template/sheet/armour.html",
    "systems/dark-heresy-rt/template/sheet/gear.html",
    "systems/dark-heresy-rt/template/sheet/drug.html",
    "systems/dark-heresy-rt/template/sheet/tool.html",
    "systems/dark-heresy-rt/template/sheet/cybernetic.html",
    "systems/dark-heresy-rt/template/sheet/weapon-modification.html",
    "systems/dark-heresy-rt/template/sheet/ammunition.html",
    "systems/dark-heresy-rt/template/sheet/force-field.html",
    "systems/dark-heresy-rt/template/sheet/characteristics/information.html",
    "systems/dark-heresy-rt/template/sheet/characteristics/left.html",
    "systems/dark-heresy-rt/template/sheet/characteristics/name.html",
    "systems/dark-heresy-rt/template/sheet/characteristics/right.html",
    "systems/dark-heresy-rt/template/sheet/characteristics/total.html",
    "systems/dark-heresy-rt/template/chat/item.html",
    "systems/dark-heresy-rt/template/chat/roll.html",
    "systems/dark-heresy-rt/template/chat/critical.html",
    "systems/dark-heresy-rt/template/dialog/common-roll.html",
    "systems/dark-heresy-rt/template/dialog/combat-roll.html",
    "systems/dark-heresy-rt/template/dialog/psychic-power-roll.html"
  ];
  return loadTemplates(templatePaths);
}

function registerHandlebarsHelpers() {
  Handlebars.registerHelper("removeMarkup", function (text) {
    const markup = /<(.*?)>/gi;
    return text.replace(markup, "");
  })
  Handlebars.registerHelper("advanceCharacteristic", function (characteristic) {
    characteristic = normalize(characteristic, 0);
    switch (characteristic) {
      case 0:
        return "N";
      case 5:
        return "S";
      case 10:
        return "I";
      case 15:
        return "T";
      case 20:
        return "P";
      case 25:
        return "E";
      default:
        return "N";
    }
  });
  Handlebars.registerHelper("advanceSkill", function (skill) {
    skill = normalize(skill, 0);
    switch (skill) {
      case -20:
        return "U";
      case 0:
        return "K";
      case 10:
        return "T";
      case 20:
        return "E";
      case 30:
        return "V";
      default:
        return "U";
    }
  });
  Handlebars.registerHelper("psychicPower", function (psychicPower) {
    psychicPower = normalize(psychicPower, "bound");
    switch (psychicPower) {
      case "bound":
        return game.i18n.localize("PSYCHIC_POWER.BOUND");
      case "unbound":
        return game.i18n.localize("PSYCHIC_POWER.UNBOUND");
      case "daemonic":
        return game.i18n.localize("PSYCHIC_POWER.DAEMONIC");
      default:
        return game.i18n.localize("PSYCHIC_POWER.BOUND");
    }
  });
  Handlebars.registerHelper("clip", function (clip) {
    return `${clip.value}/${clip.max}`
  });
  Handlebars.registerHelper("rateOfFire", function (rof) {
    let single = rof.single > 0 ? "S" : "-";
    let burst = rof.burst > 0 ? `${rof.burst}` : "-";
    let full = rof.full > 0 ? `${rof.full}` : "-";
    return `${single}/${burst}/${full}`
  });
  Handlebars.registerHelper("weaponClass", function (weaponClass) {
    weaponClass = normalize(weaponClass, "melee");
    switch (weaponClass) {
      case "melee":
        return game.i18n.localize("WEAPON.MELEE");
      case "thrown":
        return game.i18n.localize("WEAPON.THROWN");
	  case "launched":
        return game.i18n.localize("WEAPON.LAUNCHED");
	  case "placed":
        return game.i18n.localize("WEAPON.PLACED");
      case "pistol":
        return game.i18n.localize("WEAPON.PISTOL");
      case "basic":
        return game.i18n.localize("WEAPON.BASIC");
      case "heavy":
        return game.i18n.localize("WEAPON.HEAVY");
      case "vehicle":
        return game.i18n.localize("WEAPON.VEHICLE");
      default:
        return game.i18n.localize("WEAPON.MELEE");
    }
  });
  Handlebars.registerHelper("weaponType", function (weaponType) {
    weaponType = normalize(weaponType, "las");
    switch (weaponType) {
      case "las":
        return game.i18n.localize("WEAPON.LAS");
      case "solidprojectile":
        return game.i18n.localize("WEAPON.SOLIDPROJECTILE");
	  case "bolt":
        return game.i18n.localize("WEAPON.BOLT");
	  case "melta":
        return game.i18n.localize("WEAPON.MELTA");
	  case "plasma":
        return game.i18n.localize("WEAPON.PLASMA");
      case "flame":
        return game.i18n.localize("WEAPON.FLAME");
      case "lowtech":
        return game.i18n.localize("WEAPON.LOWTECH");
      case "launcher":
        return game.i18n.localize("WEAPON.LAUNCHER");
      case "explosive":
        return game.i18n.localize("WEAPON.EXPLOSIVE");
      case "exotic":
        return game.i18n.localize("WEAPON.EXOTIC");
      case "chain":
        return game.i18n.localize("WEAPON.CHAIN");
      case "power":
        return game.i18n.localize("WEAPON.POWER");
      case "shock":
        return game.i18n.localize("WEAPON.SHOCK");
      case "force":
        return game.i18n.localize("WEAPON.FORCE");
      default:
        return game.i18n.localize("WEAPON.LAS");
    }
  });
  Handlebars.registerHelper("damageType", function (damageType) {
    damageType = normalize(damageType, "impact");
    switch (damageType) {
      case "energy":
        return game.i18n.localize("DAMAGE_TYPE.ENERGY_SHORT");
      case "impact":
        return game.i18n.localize("DAMAGE_TYPE.IMPACT_SHORT");
      case "rending":
        return game.i18n.localize("DAMAGE_TYPE.RENDING_SHORT");
      case "explosive":
        return game.i18n.localize("DAMAGE_TYPE.EXPLOSIVE_SHORT");
      default:
        return game.i18n.localize("DAMAGE_TYPE.IMPACT_SHORT");
    }
  });
  Handlebars.registerHelper("damageTypeLong", function (damageType) {
    damageType = normalize(damageType, "i");
    switch (damageType) {
      case "e":
        return game.i18n.localize("DAMAGE_TYPE.ENERGY");
      case "i":
        return game.i18n.localize("DAMAGE_TYPE.IMPACT");
      case "r":
        return game.i18n.localize("DAMAGE_TYPE.RENDING");
      case "e":
        return game.i18n.localize("DAMAGE_TYPE.EXPLOSIVE");
      default:
        return game.i18n.localize("DAMAGE_TYPE.IMPACT");
    }
  });
  Handlebars.registerHelper("craftsmanship", function (craftsmanship) {
    craftsmanship = normalize(craftsmanship, "common");
    switch (craftsmanship) {
      case "poor":
        return game.i18n.localize("CRAFTSMANSHIP.POOR");
      case "common":
        return game.i18n.localize("CRAFTSMANSHIP.COMMON");
      case "good":
        return game.i18n.localize("CRAFTSMANSHIP.GOOD");
      case "best":
        return game.i18n.localize("CRAFTSMANSHIP.BEST");
      default:
        return game.i18n.localize("CRAFTSMANSHIP.COMMON");
    }
  });
  Handlebars.registerHelper("availability", function (availability) {
    availability = normalize(availability, "common");
    switch (availability) {
      case "ubiquitous":
        return game.i18n.localize("AVAILABILITY.UBIQUITOUS");
      case "abundant":
        return game.i18n.localize("AVAILABILITY.ABUNDANT");
      case "plentiful":
        return game.i18n.localize("AVAILABILITY.PLENTIFUL");
      case "common":
        return game.i18n.localize("AVAILABILITY.COMMON");
      case "average":
        return game.i18n.localize("AVAILABILITY.AVERAGE");
      case "scarce":
        return game.i18n.localize("AVAILABILITY.SCARCE");
      case "rare":
        return game.i18n.localize("AVAILABILITY.RARE");
      case "very-rare":
        return game.i18n.localize("AVAILABILITY.VERY_RARE");
      case "extremely-rare":
        return game.i18n.localize("AVAILABILITY.EXTREMELY_RARE");
      case "near-unique":
        return game.i18n.localize("AVAILABILITY.NEAR_UNIQUE");
      case "Unique":
        return game.i18n.localize("AVAILABILITY.UNIQUE");
      default:
        return game.i18n.localize("AVAILABILITY.COMMON");
    }
  });
  Handlebars.registerHelper("armourType", function (armourType) {
    armourType = normalize(armourType, "basic");
    switch (armourType) {
      case "basic":
        return game.i18n.localize("ARMOUR_TYPE.BASIC");
      case "flak":
        return game.i18n.localize("ARMOUR_TYPE.FLAK");
      case "mesh":
        return game.i18n.localize("ARMOUR_TYPE.MESH");
      case "carapace":
        return game.i18n.localize("ARMOUR_TYPE.CARAPACE");
      case "power":
        return game.i18n.localize("ARMOUR_TYPE.POWER");
      default:
        return game.i18n.localize("ARMOUR_TYPE.COMMON");
    }
  });
  Handlebars.registerHelper("part", function (part) {
    let parts = [];
    if (part.head > 0) parts.push(`${game.i18n.localize("ARMOUR.HEAD")} (${part.head})`);
    if (part.leftArm > 0) parts.push(`${game.i18n.localize("ARMOUR.LEFT_ARM")} (${part.leftArm})`);
    if (part.rightArm > 0) parts.push(`${game.i18n.localize("ARMOUR.RIGHT_ARM")} (${part.rightArm})`);
    if (part.body > 0) parts.push(`${game.i18n.localize("ARMOUR.BODY")} (${part.body})`);
    if (part.leftLeg > 0) parts.push(`${game.i18n.localize("ARMOUR.LEFT_LEG")} (${part.leftLeg})`);
    if (part.rightLeg > 0) parts.push(`${game.i18n.localize("ARMOUR.RIGHT_LEG")} (${part.rightLeg})`);
    return parts.join(" / ");
  });
  Handlebars.registerHelper("partLocation", function (parLocation) {
    parLocation = normalize(parLocation, "body");
    switch (parLocation) {
      case "head":
        return game.i18n.localize("ARMOUR.HEAD");
      case "leftArm":
        return game.i18n.localize("ARMOUR.LEFT_ARM");
      case "rightArm":
        return game.i18n.localize("ARMOUR.RIGHT_ARM");
      case "body":
        return game.i18n.localize("ARMOUR.BODY");
      case "leftLeg":
        return game.i18n.localize("ARMOUR.LEFT_LEG");
      case "rightLeg":
        return game.i18n.localize("ARMOUR.RIGHT_LEG");
      default:
        return game.i18n.localize("ARMOUR.BODY");
    }
  });
  Handlebars.registerHelper("isInstalled", function (installed) {
    if (installed) {
      return game.i18n.localize("BUTTON.YES");
    } else {
      return game.i18n.localize("BUTTON.NO");
    }
  });
  Handlebars.registerHelper("psychicPowerZone", function (psychicPowerZone) {
    psychicPowerZone = normalize(psychicPowerZone, "bolt");
    switch (psychicPowerZone) {
      case "bolt":
        return game.i18n.localize("PSYCHIC_POWER.BOLT");
      case "barrage":
        return game.i18n.localize("PSYCHIC_POWER.BARRAGE");
      case "storm":
        return game.i18n.localize("PSYCHIC_POWER.STORM");
      default:
        return game.i18n.localize("PSYCHIC_POWER.BOLT");
    }
  });
}

function normalize(data, defaultValue) {
  if (typeof data === "string") {
    return data.toLowerCase();
  } else if (data) {
    return data;
  } else {
    return defaultValue;
  }
}
