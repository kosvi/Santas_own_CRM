import { Entry } from './entries';
import { Group } from './groups';
import { Item } from './items';
import { Page } from './pages';
import { Permission } from './permissions';
import { Person } from './persons';
import { Session } from './sessions';
import { UserGroup } from './usergroups';
import { User } from './users';
import { Wish } from './wishes';

// Initialize relation between user and it's sessions
User.hasMany(Session);
Session.belongsTo(User);

/*
 * User can belong to multiple groups. 
 * Each group can be given read/write access to individual pages. 
 * For example: 
 *  - we have page called 'entries', group 'scouts' can add entries, but 'santa' can only see those entries 
 */
// Initialize relation between users and their groups
User.belongsToMany(Group, { through: UserGroup });
Group.belongsToMany(User, { through: UserGroup });

// Initialize relations between pages and groups
Page.belongsToMany(Group, { through: Permission });
Group.belongsToMany(Page, { through: Permission });

// Initialize relations between entries and users who wrote them and persons they describe
User.hasMany(Entry);
Entry.belongsTo(User);
Person.hasMany(Entry);
Entry.belongsTo(Person);

// Initialize relation between a person and it's wishes (and wish and item wished)
Person.hasMany(Wish);
Wish.belongsTo(Person);
Wish.hasOne(Item);
Item.belongsTo(Wish);

export default {
  Entry, Group, Item, Page, Permission, Person, Session, UserGroup, User, Wish
};
