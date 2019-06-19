import { getRequest, postRequest, putRequest, deleteRequest} from '@/libs/axios';

export function getMaxId(ownerId) {
  const data = {
    ownerId
  }
  return postRequest('/note/tree/maxid',data);
}

export function addTree(ownerId, title, pid) {
  const data = {
    ownerId,
    title,
    pid
  }
  return postRequest('/note/tree/add',data);
}
export function saveTree(ownerId, name, parentId, id) {
  const data = {
    ownerId,
    name,
    parentId,
    id
  }
  return postRequest('/note/tree/save',data);
}
export function deleteTree(ids, params) {
  return deleteRequest(`/note/tree/delete/${ids}`, params)

}

export function getTreeList(ownerId, parentId) {
  const data = {
    ownerId,
    parentId
  }
  return postRequest('/note/tree/list',data);
}

export function search(ownerId, content) {
  const data = {
    ownerId,
    content
  }
  return postRequest('/note/list/search',data);
}
export function saveListItem(ownerId, parentId, id, name, type, content, ext) {
  const data = {
    ownerId,
    parentId,
    id,
    name,
    type,
    content,
    ext
  }
  return postRequest('/note/list/save',data);
}

export function deleteListItem(ownerId, itemId) {
  const data = {
    ownerId,
    itemId
  }
  return postRequest('/note/list/delete',data);
}
export function getListItems(ownerId, parentId) {
  const data = {
    ownerId,
    parentId
  }
  return postRequest('/note/list/list',data);
}


export function getNoteContent(ownerId, id) {
  const data = {
    ownerId,
    id
  }
  return postRequest('/note/list/content',data);
}

// 获取
export const getGitItemListData = (params) => {
  return getRequest('/note/git/list', params)
}
// 添加
export const addGitItem = (params) => {
  return postRequest('/note/git/add', params)
}
// 编辑
export const editGitItem = (params) => {
  return postRequest('/note/git/edit', params)
}
// 删除
export const deleteGitItem = (ids, params) => {
  return deleteRequest(`/note/git/delByIds/${ids}`, params)
}

export function pullGitItem(id) {
  const data = {
    id
  }
  return postRequest('/note/git/pull',data);
}

export function pushGitItem(id) {
  const data = {
    id
  }
  return postRequest('/note/git/push',data);
}