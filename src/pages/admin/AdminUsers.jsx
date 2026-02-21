// AdminUsers - User management page with data table
import { motion } from 'framer-motion';
import UserTable from '../../components/admin/UserTable';

const AdminUsers = () => {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <UserTable />
      </motion.div>
    </div>
  );
};

export default AdminUsers;

