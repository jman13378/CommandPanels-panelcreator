function SaveAsFile(t, f, m) {
  /// to save the file once parsed
  try {
    var b = new Blob([t], { type: m });
    saveAs(b, f);
  } catch (e) {
    window.open("data:" + m + "," + encodeURIComponent(t), "_blank", "");
  }
}
function createNewEnchant(id) {
    let ensection = document.getElementById(`item-enchants-${id}`)
    ensection.insertAdjacentHTML(
        "beforeend",``)
}

function createItemText(id) {
    let material = document.getElementById(`item-${id}-item-material`);// required
    let name = document.getElementById(`item-${id}-item-name`);
    let stack = document.getElementById(`item-${id}-item-stack`);
    let durability = document.getElementById(`item-${id}-item-damage`);
    let enchantedstate = document.getElementById(`item-enchantEnabled-${id}`)
    let enchantname = document.getElementsByName(`item-enchant-${id}`)
    let slot = document.getElementById(`item-${id}-item-slot`);// required
    let ID = document.getElementById(`item-${id}-item-id`);
    let data = document.getElementById(`item-${id}-item-data`);
    // TODO: let ITypes
    // TODO: hasSections let hasSections = yes

    let item=
    `\n      '${slot.value}':\n`+
    `        material: ${material.value}`
    if (name.value!=undefined) item=item.concat(`\n        name: "${name.value}"`)
    if (data.value!=undefined) item=item.concat(`\n        customdata: "${data.value}"`)
    if (stack.value!=undefined) item=item.concat(`\n        stack: "${stack.value}"`)
    if (durability.value!=undefined) item=item.concat(`\n        damage: "${durability.value}"`)
    if (ID.value!=undefined) item=item.concat(`\n        id: "${ID.value}"`)

    if (enchantedstate.checked) {
            item=item.concat(`\n        enchanted: true`)
    } else {
        for(let i =1; i < enchantname.length+1; i++) {
        
        
            if (i==1) item=item.concat(`\n        enchanted:`)
            let ename = document.getElementById(`item-enchant-1-${i}`)
            let elevel = document.getElementById(`item-enchantLevel-1-${i}`)
            item=item.concat(`\n        - ${getJsonEnchant(ename.value).name} ${elevel.value}`)
        }
    }
    return item

}




document.onsubmit = function () {
    // settings
  let title = document.getElementById("title");
  let name = document.getElementById("panel-name");
  let rows = document.getElementById("rows");
  let perm = document.getElementById("perm");
  let refdelay = document.getElementById("refresh-delay");
  let opensound = document.getElementById("sound-on-open");
  let paneltype = document.getElementsByClassName("panel-type");
  let permmsg = document.getElementById("permission");
  let inputmsg = document.getElementById("input"); 

  let outsidecmds = document.getElementsByName("OCommand");
  let opencmds = document.getElementsByName("OOCommand");
  let closecmds = document.getElementsByName("COCommand");
  let precmds = document.getElementsByName("PLCommand");




  let finaltext =
    `panels:\n` +
    `  ${name.value}:\n` +
    `    title: "${title.value}"\n` +
    `    rows: ${rows.value}`;
  if (perm == undefined) {
    finaltext = finaltext.concat(`\n    perm: default`);
  } else {
    finaltext = finaltext.concat(`\n    perm: ${perm.value}`);
  }
  if (refdelay.value != undefined)
    finaltext = finaltext.concat(`\n    refresh-delay: ${refdelay.value}`);
  if (opensound.value != undefined)
    finaltext = finaltext.concat(`\n    sound-on-open: ${opensound.value}`);
  if (paneltype.length != 0) {
    finaltext = finaltext.concat(`\n    panelType:`);
    for (let i = 0; i < paneltype.length; i++) {
      finaltext = finaltext.concat(`\n    - ${paneltype[i].value}`);
    }
  }
  if (inputmsg!=undefined ||permmsg!=undefined ){
    finaltext = finaltext.concat(`\n    custom-messages:`); 
  if (inputmsg!=undefined) {
    finaltext = finaltext.concat(`\n      input: ${inputmsg.value}`);
  }
  if (permmsg!=undefined) {
    finaltext = finaltext.concat(`\n      perms: ${permmsg.value}`);
  }}
  if (outsidecmds.length != 0) {
    finaltext = finaltext.concat(`\n    outside-commands:`);
    for (let i = 0; i < outsidecmds.length; i++) {
      finaltext = finaltext.concat(`\n    - ${outsidecmds[i].value}`);
    }
  }
  if (precmds.length != 0) {
    finaltext = finaltext.concat(`\n    pre-load-commands:`);
    for (let i = 0; i < precmds.length; i++) {
      finaltext = finaltext.concat(`\n    - ${precmds[i].value}`);
    }
  }
  if (closecmds.length != 0) {
    finaltext = finaltext.concat(`\n    commands-on-close:`);
    for (let i = 0; i < closecmds.length; i++) {
      finaltext = finaltext.concat(`\n    - ${closecmds[i].value}`);
    }
  }
  if (opencmds.length != 0) {
    finaltext = finaltext.concat(`\n    commands-on-open:`);
    for (let i = 0; i < opencmds.length; i++) {
      finaltext = finaltext.concat(`\n    - ${opencmds[i].value}`);
    }
  }
  if (document.getElementsByClassName('collapsible')[0].children.length>=1) {
    finaltext = finaltext.concat(`\n    items:`);
    for (let i =1; i < document.getElementsByClassName('collapsible')[0].children.length+1; i++) {
        finaltext = finaltext.concat(createItemText(i))
      }
  }
  window.alert(finaltext);
  SaveAsFile(finaltext, `${name.value}.yml`, "text/plain;charset=utf-8");
};

function createNewOC() {
  // create outside commands
  var element = document.getElementById("Ocommands");
  let outsidecmds = document.getElementsByName("OCommand");
  element.insertAdjacentHTML(
    "beforeend",
    `<div class="row"></div><div class="input-field col s6"><input id="command${
      outsidecmds.length + 1
    }" type="text" name="OCommand"><label for="command${
      outsidecmds.length + 1
    }">Outside Command</label></div>`
  );
}
function CreateItem() {
  // create a new item
  var element = document.getElementsByClassName("collapsible")[0];
  element.insertAdjacentHTML(
    "beforeend",
    `<li>
        <div class="collapsible-header">
            <i class="material-icons">arrow_drop_down</i>
        </div>
        <div class="collapsible-body">
            <span>Lorem ipsum dolor sit amet.</span>
        </div>
    </li>`
  );
}

function createNewPLC() {
  // create pre-load-command
  var element = document.getElementById("PLcommands");
  let outsidecmds = document.getElementsByName("PLCommand");
  element.insertAdjacentHTML(
    "beforeend",
    `<div class="row"></div>
      <div class="input-field col s6">
      <input id="PLcommand${
        outsidecmds.length + 1
      }" type="text" name="PLCommand"><label for="PLcommand${
      outsidecmds.length + 1
    }">Pre-Load Command</label></div>`
  );
}

function createNewCOC() {
  // create commands-on-close
  var element = document.getElementById("OCcommands");
  let outsidecmds = document.getElementsByName("OCCommand");
  element.insertAdjacentHTML(
    "beforeend",
    `<div class="row"></div>
      <div class="input-field col s6">
      <input id="OCcommand${
        outsidecmds.length + 1
      }" type="text" name="OCCommand"><label for="OCcommand${
      outsidecmds.length + 1
    }">Command-On-Close</label></div>`
  );
}

function createNewCOO() {
  // create commands-on-open
  var element = document.getElementById("OOcommands");
  let outsidecmds = document.getElementsByName("OOCommand");
  element.insertAdjacentHTML(
    "beforeend",
    `<div class="row">
      </div>
      <div class="input-field col s6">
      <input id="OOcommand${
        outsidecmds.length + 1
      }" type="text" name="OOCommand"><label for="OOcommand${
      outsidecmds.length + 1
    }">Command-On-Open</label>
      </div>`
  );
}


function getJsonEnchant(s) {
    let json = [
       {"name":"Efficiency"             ,"maxlevel": 5},{
        "name":"Silk Touch"             ,"maxlevel": 1},{
        "name":"Unbreaking"             ,"maxlevel": 3},{
        "name":"Fortune"                ,"maxlevel": 3},{
        "name":"Luck of the sea"        ,"maxlevel": 3},{
        "name":"Lure"                   ,"maxlevel": 3},{
        "name":"Mending"                ,"maxlevel": 1},{
        "name":"Curse of Vanishing"     ,"maxlevel": 1},{
        "name":"Protection"             ,"maxlevel": 4},{
        "name":"Fire Protection"        ,"maxlevel": 4},{
        "name":"Feather Falling"        ,"maxlevel": 4},{
        "name":"Blast Protection"       ,"maxlevel": 4},{
        "name":"Projectile Protection"  ,"maxlevel": 4},{
        "name":"Respiration"            ,"maxlevel": 3},{
        "name":"Aqua Affinity"          ,"maxlevel": 1},{
        "name":"Thorns"                 ,"maxlevel": 3},{
        "name":"Depth Strider"          ,"maxlevel": 3},{
        "name":"Frost Walker"           ,"maxlevel": 2},{
        "name":"Curse of Binding"       ,"maxlevel": 1},{
        "name":"Soul Speed"             ,"maxlevel": 3},{
        "name":"Sharpness"              ,"maxlevel": 5},{
        "name":"Smite"                  ,"maxlevel": 5},{
        "name":"Bang of Arthropods"     ,"maxlevel": 5},{
        "name":"KnockBack"              ,"maxlevel": 2},{
        "name":"Fire Aspect"            ,"maxlevel": 2},{
        "name":"Looting"                ,"maxlevel": 3},{
        "name":"Sweeping Edge"          ,"maxlevel": 3},{
        "name":"Power"                  ,"maxlevel": 5},{
        "name":"Punch"                  ,"maxlevel": 2},{
        "name":"Flame"                  ,"maxlevel": 1},{
        "name":"Infinity"               ,"maxlevel": 1},{
        "name":"Loyalty"                ,"maxlevel": 3},{
        "name":"Impaling"               ,"maxlevel": 5},{
        "name":"Riptide"                ,"maxlevel": 3},{
        "name":"Channeling"             ,"maxlevel": 1},{
        "name":"Multishot"              ,"maxlevel": 1},{
        "name":"Quick Charge"           ,"maxlevel": 3},{
        "name":"Piercing"               ,"maxlevel": 4}
        ]
        return json[s-1]
}
function setLevels(s) {
    let element = document.getElementById(`item-enchantLevel${s.id.replace("item-enchant", "")}`)
    for (let e = 1; e < element.children.length; e++) {
        console.log(element.children[e])
        element.children[e].remove()
    }
    for (let i = 1; i < getJsonEnchant(s.value).maxlevel+1;i++) {
        element.insertAdjacentHTML("beforeend",`<option value="${i}">${i}</option>`)
    }

}