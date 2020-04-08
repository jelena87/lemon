// Shared variables to be used in application

export class ApiRoutes {

  public static USER = {
        'Users' : '/users',
        'Address' : '/users/address'
  };

  public static AUTH = {
    'Refresh': '/auth/refresh',
    'Info': '/info',
    'Login': '/auth/login'
  };

  public static ADMIN = {
    'Users': '/admin/users',
    'Admins': '/admin/admins'
  };
}
