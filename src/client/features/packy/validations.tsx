export const validatePackyName = (name: string) =>
    name
    ? /^[a-z_\-\d\s]+$/i.test(name)
        ? null
        : new Error('Name can only contain letters, numbers, space, hyphen (-) and underscore (_).')
    : new Error('Name cannot be empty.');
