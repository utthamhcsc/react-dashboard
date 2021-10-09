export const menus = [
  {
    label: 'Products',

    submenu: [
      {
        label: 'view product',
        path: '/product',
        allowedRoles: ['user', 'admin'],
      },
    ],
  },
  {
    label: 'Users',
    allowedRoles: ['admin'],
    submenu: [
      { label: 'view product', path: '/product', allowedRoles: ['admin'] },
    ],
  },
];
