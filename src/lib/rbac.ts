export type AppRole =
  | 'SUPER_ADMIN'
  | 'PRESIDENT'
  | 'SECRETARY'
  | 'TREASURER'
  | 'EC_MEMBER'
  | 'BOARD_MEMBER'
  | 'EVENT_ORGANIZER'
  | 'TOURNAMENT_DIRECTOR'
  | 'VOLUNTEER_COORDINATOR'
  | 'SPONSOR_MANAGER'
  | 'CHECKIN_STAFF'
  | 'MEMBER'
  | 'GUEST';

export type AppResource =
  | 'members'
  | 'families'
  | 'membership_plans'
  | 'events'
  | 'registrations'
  | 'check_in'
  | 'tournaments'
  | 'teams'
  | 'performances'
  | 'volunteers'
  | 'sponsors'
  | 'donations'
  | 'finances'
  | 'content'
  | 'media'
  | 'governance'
  | 'audit_logs'
  | 'settings';

export type AppAction = 'read' | 'create' | 'update' | 'delete' | 'approve' | 'export' | 'checkin';

const ROLE_PERMISSIONS: Record<AppRole, Partial<Record<AppResource, AppAction[]>>> = {
  SUPER_ADMIN: {
    members: ['read', 'create', 'update', 'delete', 'export'],
    families: ['read', 'create', 'update', 'delete'],
    membership_plans: ['read', 'create', 'update', 'delete'],
    events: ['read', 'create', 'update', 'delete', 'export'],
    registrations: ['read', 'create', 'update', 'delete', 'export'],
    check_in: ['read', 'checkin'],
    tournaments: ['read', 'create', 'update', 'delete'],
    teams: ['read', 'create', 'update', 'delete'],
    performances: ['read', 'create', 'update', 'delete', 'approve'],
    volunteers: ['read', 'create', 'update', 'delete'],
    sponsors: ['read', 'create', 'update', 'delete'],
    donations: ['read', 'create', 'update', 'delete', 'export'],
    finances: ['read', 'create', 'update', 'delete', 'approve', 'export'],
    content: ['read', 'create', 'update', 'delete'],
    media: ['read', 'create', 'update', 'delete'],
    governance: ['read', 'create', 'update', 'delete', 'approve'],
    audit_logs: ['read'],
    settings: ['read', 'update'],
  },
  PRESIDENT: {
    members: ['read', 'export'],
    events: ['read', 'create', 'update', 'approve'],
    registrations: ['read'],
    performances: ['read', 'approve'],
    sponsors: ['read', 'approve'],
    finances: ['read', 'approve'],
    governance: ['read', 'create', 'approve'],
    audit_logs: ['read'],
  },
  TREASURER: {
    finances: ['read', 'create', 'update', 'approve', 'export'],
    donations: ['read', 'export'],
    members: ['read', 'export'],
    registrations: ['read', 'export'],
    sponsors: ['read', 'update'],
  },
  SECRETARY: {
    governance: ['read', 'create', 'update'],
    content: ['read', 'create', 'update'],
    media: ['read', 'create', 'update'],
    members: ['read'],
    events: ['read'],
  },
  EC_MEMBER: {
    events: ['read', 'update'],
    registrations: ['read'],
    volunteers: ['read', 'update'],
    performances: ['read', 'update'],
  },
  BOARD_MEMBER: {
    governance: ['read', 'approve'],
    finances: ['read'],
    audit_logs: ['read'],
  },
  EVENT_ORGANIZER: {
    events: ['read', 'update'],
    registrations: ['read', 'export'],
    check_in: ['read', 'checkin'],
    performances: ['read', 'update', 'approve'],
  },
  TOURNAMENT_DIRECTOR: {
    tournaments: ['read', 'create', 'update'],
    teams: ['read', 'create', 'update', 'approve'],
  },
  VOLUNTEER_COORDINATOR: {
    volunteers: ['read', 'create', 'update', 'delete'],
    events: ['read'],
  },
  SPONSOR_MANAGER: {
    sponsors: ['read', 'create', 'update'],
  },
  CHECKIN_STAFF: {
    check_in: ['read', 'checkin'],
    registrations: ['read'],
    events: ['read'],
  },
  MEMBER: {
    events: ['read'],
    tournaments: ['read'],
    performances: ['read'],
  },
  GUEST: {
    events: ['read'],
  },
};

export function hasPermission(
  userRoles: AppRole[],
  resource: AppResource,
  action: AppAction
): boolean {
  if (userRoles.includes('SUPER_ADMIN')) return true;

  return userRoles.some((role) => {
    const resourceActions = ROLE_PERMISSIONS[role]?.[resource];
    return resourceActions ? resourceActions.includes(action) : false;
  });
}
