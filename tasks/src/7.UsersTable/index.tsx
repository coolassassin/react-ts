import React from 'react';
import { createRoot } from 'react-dom/client';
import EditUserForm from './EditUserForm';
import './styles.css';
import * as helpers from './helpers';
import defaultUsers, { User } from './defaultUsers';

/**
  There is a guest table and a form for adding guests. The table displays only the basic information. Everything works, but inefficiently—many unnecessary operations occur within React with any user action.

  In this task, messages are logged to the console during important lifecycle events. You can view these messages in the Developer Tools.

  Ensure that unnecessary events do not occur.

  Allowed React events:
    1. At the beginning, 6 events occur, and this is normal:
    UserTable render, UserTableRow render (2), UserTableRow mount (2), UserTable mount
    2. When adding a new row, there should be 3 events:
    UserTable render, UserTableRow render, and UserTableRow mount for the new row
    3. When clicking the edit button: no events
    4. When saving after changing the visible field: UserTable render, UserTableRow render of that row
    5. When saving after changing the invisible field: UserTable render

  FYI, the code uses the following JS features:
  - "Spread operator for an array"
  Creates a new array, adding all elements from objs first, and then one more element.
  [...objs, { id: 1 }]
  - "Spread operator for an object"
  Creates a new object, filling it with properties from obj first, and then adding a new property.
  { ...obj, key: value }
 */

let generation = 1;
let generationEvents = 1;

function updateGeneration() {
  generation++;
  generationEvents = 1;
}

function logEvent(msg: string) {
  console.log(` ${generation}.${generationEvents++}\t${msg}`);
}

const Users = () => {
  const [users, setUsers] = React.useState<User[]>(defaultUsers);
  const [editingUser, setEditingUser] = React.useState<User | null>(null);

  const handleAddUser = () => {
    const newId = helpers.getNewId(users);
    updateGeneration();
    setUsers([{ id: newId }, ...users]);
  };

  const handleEditUser = (user: User) => {
    updateGeneration();
    setEditingUser(user);
  };

  const handleSaveUser = (user: User) => {
    updateGeneration();
    setEditingUser(null);
    setUsers(users.map(u => (u.id === user.id ? user : u)));
  };

  if (editingUser) {
    return (
      <div className="root">
        <EditUserForm user={editingUser} onSave={handleSaveUser} />
        <UserTable users={users} onEditUser={handleEditUser} onAddUser={handleAddUser} />
      </div>
    );
  }
  return (
    <div className="root">
      <UserTable users={users} onEditUser={handleEditUser} onAddUser={handleAddUser} />
    </div>
  );
};

const UserTable = ({ users, onEditUser, onAddUser }: UserTableProps) => {
  React.useEffect(() => {
    logEvent('UserTable\t\t did mount');
    return () => logEvent('UserTable\t\t will unmount');
  }, []);

  logEvent('UserTable\t\t render');

  return (
    <div className="table">
      <table>
        <thead>
          <tr>
            <th>Фамилия</th>
            <th>Имя</th>
            <th>Возраст</th>
            <th>
              <input type="submit" className="editButton" value="Add" onClick={onAddUser} />
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <UserTableRow user={user} key={index} onEditUser={onEditUser} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

interface UserTableProps {
  users: User[];
  onEditUser: (user: User) => void;
  onAddUser: () => void;
}

const UserTableRow = ({ user, onEditUser }: UserTableRowProps) => {
  React.useEffect(() => {
    logEvent('UserTableRow\t did mount with id=' + user.id);
    return () => logEvent('UserTableRow\t will unmount with id=' + user.id);
  }, []);
  logEvent('UserTableRow\t render with id=' + user.id);

  const handleEditUser = () => {
    onEditUser(user);
  };

  return (
    <tr>
      <td>{user.surname}</td>
      <td>{user.firstName}</td>
      <td>{helpers.calculateAge(user.dateOfBirth)}</td>
      <td>
        <input className="editButton" type="button" onClick={handleEditUser} value="Change" />
      </td>
    </tr>
  );
};

interface UserTableRowProps {
  user: User;
  onEditUser: (user: User) => void;
}

const domNode = document.getElementById('app') as HTMLElement;
const root = createRoot(domNode);
root.render(<Users />);

/**
    Hints:

    - React redraws nodes sequentially. If it sees that a span replaces a div, the div will be completely removed (unmounted), even if the necessary div follows that span. To preserve the order of nodes, leave "gaps" with null nodes, undefined nodes, or false nodes like this:
    {showSpan && <span>A little hint</span>}
    <div>Main text</div>
    If the span is not needed, an invisible false node will take its place, and the div will remain in its place.

    - Changing setState in a component leads to its redraw, often along with its children. However, if a child component inherits PureComponent, it will not be redrawn if its props have not changed. This can be used to optimize rendering.

    - The key to performance lies in correctly assigning keys.

    - You will need shouldComponentUpdate(nextProps, nextState) in the end.
 */
