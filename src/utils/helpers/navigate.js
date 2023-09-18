import { convertQueryToString, getRouterParams, getRouterByName } from './index';

export const navigatePages = (navigate, name, params = {}, query = {}) => {
  if (name === 'BACK') {
    return navigate(-1)
  }
  const currentRouter = getRouterByName(name)
  if (!currentRouter) {
    return navigate('/')
  }
  const newPath = convertQueryToString(getRouterParams(currentRouter.path, params), query)
  return navigate(newPath)
}