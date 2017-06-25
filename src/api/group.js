const GROUP_LIST_SOURCE = '/api/web/categoryGroups';

function getGroups() {
  return new Promise((resolve, reject) => {
    fetch(GROUP_LIST_SOURCE).then(res => {
      resolve(res);
    }, error => {
      console.error(error);
      reject(error);
    });
  });
}

var Group = {
  list: getGroups
}

export default Group;