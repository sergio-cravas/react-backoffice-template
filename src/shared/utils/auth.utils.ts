function hasPermission(userPerm: string, requiredPerm: string): boolean {
  if (typeof userPerm !== 'string' || typeof requiredPerm !== 'string') {
    console.error(`Both userPerm and requiredPerm must be strings`);

    return false;
  }

  if (!userPerm || !requiredPerm) return false;

  const userParts = userPerm.split('.');
  const requiredParts = requiredPerm.split('.');

  return requiredParts.every((part, idx) => userParts[idx] === part);
}

export function hasPerm(permissions: string[] = [], requiredPerm?: string): boolean {
  if (!requiredPerm || permissions.includes('god')) return true;

  return permissions.some((perm) => hasPermission(perm, requiredPerm));
}
