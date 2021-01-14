const pages = [
  {
    pathname: '/getting-started',
    children: [
      {
        pathname: '/getting-started/usage',
      },
      {
        pathname: '/getting-started/firstpacki',
        title: 'First packi',
      },
    ],
  },
  {
    pathname: '/wizzi',
    title: 'Wizzi folder',
    children: [
      {
        pathname: '/wizzi/ittf',
      },
      {
        pathname: '/wizzi/jobs',
      },
    ],
  },
];
export default pages;
