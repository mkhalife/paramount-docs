// expects an object, object key, and value for that key
// returns an object found by value
// for example, findNested({ level1: { level2: "test" } }, "level2", "test") returns...
// { level2: "test" }

function findNested(obj, key, value) {
	var keys = Object.keys(obj);
  // Base case
  if (obj[key] === value) {
    return obj;
  } else {
    for (var i = 0; i < keys.length; i++) {
      if (typeof obj[keys[i]] == 'object') {
        var found = findNested(obj[keys[i]], key, value);
        if (found) {
          // If the object was found in the recursive call, bubble it up.
          return found;
        }
      }
    }
  }
}

// expects an array of filepaths e.g. ["users/username/downlods/test.png", "users/username/downloads/test2.png"]
// returns an array of objects representing folders in a directory structure.
// for example, convertToDirTree(["/how/to/about.md"]) returns...
// [
//   {
//     "type": "folder",
//     "name": "how",
//     "children": [
//       {
//         "type": "folder",
//         "name": "to",
//         "children": [
//           {
//             "type": "file",
//             "name": "about.md"
//           }
//         ]
//       }
//     ]
//   }
// ]

export function convertToDirTree(array) {
  var output = [];
  var current;

  for(var i = 0; i < array.length; i++) {
    var folders = array[i].split('/');
    current = output;

    for(var j = 0; j < folders.length; j++) {
      if(folders[j] != '') {
      	// generate unique path by combining previous folders
				var path = "";
        var parentPath = "";
        for(var k = 0; k <= j; k++) {
        	path += folders[k] != '' ? '/' + folders[k] : '';
          if (k <= j - 1) {
          	parentPath += folders[k] != '' ? '/' + folders[k] : '';
          }
        }
        path = path.endsWith(".md") ? path.replace(".md", "") : path;
        parentPath = parentPath.endsWith(".md") ? parentPath.replace(".md", "") : parentPath
        
        var parentFound = findNested(current, "path", parentPath);
        var childFound = findNested(current, "path", path);

        var newObject = {
            type: folders[j].endsWith(".md") ? "file" : "folder",
            name: folders[j],
            path: path,
            children: folders[j].endsWith(".md") ? undefined : []
          };

        if (!parentFound && !childFound) {
          current.push(newObject);
        } else if (parentFound && !childFound) {
          parentFound.children.push(newObject);
        }
      }
    }
  }
  
  return output;
}
