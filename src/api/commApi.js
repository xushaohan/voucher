import { post, get } from '@/utils/axios';
import { rootPath } from '@/settings';

export function getPackageJson(data) {
    return get(rootPath + '/package.json', data);
}
