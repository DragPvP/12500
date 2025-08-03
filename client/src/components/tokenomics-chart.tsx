import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { motion } from 'framer-motion';

const tokenomicsData = [
  { name: 'Presale', value: 30, color: '#8B5CF6' },
  { name: 'Staking', value: 25, color: '#F59E0B' },
  { name: 'Liquidity', value: 20, color: '#3B82F6' },
  { name: 'Marketing', value: 20, color: '#EC4899' },
  { name: 'Community', value: 5, color: '#10B981' }
];

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
  cx, cy, midAngle, innerRadius, outerRadius, percent, name
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text 
      x={x} 
      y={y} 
      fill="white" 
      textAnchor={x > cx ? 'start' : 'end'} 
      dominantBaseline="central"
      fontSize="14"
      fontWeight="bold"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
        <p className="text-gray-900 font-semibold">{data.name}</p>
        <p className="text-gray-600">{data.value}% of total supply</p>
      </div>
    );
  }
  return null;
};

const LegendItem = ({ entry, index }: any) => {
  if (!entry) return null;
  
  return (
    <motion.div 
      className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <div 
        className="w-4 h-4 rounded-full flex-shrink-0" 
        style={{ backgroundColor: entry.color }}
      />
      <div className="flex-1">
        <div className="text-white font-semibold text-sm">{entry.value}%</div>
        <div className="text-white/80 text-xs">{entry.name}</div>
      </div>
    </motion.div>
  );
};

export function TokenomicsChart() {
  return (
    <motion.section 
      className="py-12 bg-gradient-to-br from-green-400 via-green-500 to-green-600 relative overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full blur-xl"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-white rounded-full blur-xl"></div>
        <div className="absolute bottom-20 left-32 w-24 h-24 bg-white rounded-full blur-xl"></div>
        <div className="absolute bottom-32 right-16 w-12 h-12 bg-white rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/4 w-6 h-6 bg-white rounded-full opacity-60"></div>
        <div className="absolute top-1/3 right-1/3 w-4 h-4 bg-white rounded-full opacity-40"></div>
        <div className="absolute bottom-1/3 left-1/2 w-8 h-8 bg-white rounded-full opacity-50"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Chart Only */}
        <motion.div 
          className="flex justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="relative">
            <ResponsiveContainer width={500} height={500}>
              <PieChart>
                <Pie
                  data={tokenomicsData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={180}
                  innerRadius={60}
                  fill="#8884d8"
                  dataKey="value"
                  stroke="none"
                >
                  {tokenomicsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            
            {/* Center Logo */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-24 h-24 bg-green-600 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                <img 
                  src="/img/pepewuff-logo.png" 
                  alt="PEPEWUFF" 
                  className="w-16 h-16 rounded-full"
                />
              </div>
            </div>

            {/* External Labels */}
            <div className="absolute top-16 left-16 text-white font-bold text-xl">20%</div>
            <div className="absolute top-12 left-20 text-white text-lg">Marketing</div>
            
            <div className="absolute top-20 right-16 text-white font-bold text-xl">5%</div>
            <div className="absolute top-16 right-12 text-white text-lg">Community</div>
            
            <div className="absolute top-32 right-8 text-white font-bold text-xl">20%</div>
            <div className="absolute top-28 right-4 text-white text-lg">Liquidity</div>
            
            <div className="absolute bottom-32 right-16 text-white font-bold text-xl">25%</div>
            <div className="absolute bottom-28 right-20 text-white text-lg">Staking</div>
            
            <div className="absolute bottom-20 left-16 text-white font-bold text-xl">30%</div>
            <div className="absolute bottom-16 left-20 text-white text-lg">Presale</div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}