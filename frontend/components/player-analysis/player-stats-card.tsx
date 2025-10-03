import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Calendar, Target, TrendingUp, Activity, Award, BarChart3, Zap } from "lucide-react";
import { motion } from "framer-motion";

interface PlayerStatsCardProps {
  playerName: string;
  playerType: 'batsman' | 'bowler';
  stats: {
    avg?: number;
    sr: number;
    mat?: number;
    runs?: number;
    wickets?: number;
    fours?: number;
    sixes?: number;
    econ?: number;
  };
  className?: string;
}

export function PlayerStatsCard({
  playerName,
  playerType,
  stats,
  className = ""
}: PlayerStatsCardProps) {
  const formatNumber = (num: number | undefined, decimals = 0) => {
    if (num === undefined) return 'N/A';
    return num.toLocaleString('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    });
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const
      }
    }
  };

  const statItemVariants = {
    hidden: { opacity: 0, y: 15, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 120,
        damping: 15
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={className}
    >
      <motion.div variants={cardVariants}>
        <Card className="bg-gradient-to-br from-background to-muted/20 hover:shadow-xl transition-all duration-300 border-2 border-primary/10">
          <CardHeader className="pb-6">
            <motion.div
              className="flex items-center justify-between"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <CardTitle className="flex items-center gap-3 text-xl font-bold">
                <motion.div
                  className="p-2 bg-primary/10 rounded-full"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <User className="h-6 w-6 text-primary" />
                </motion.div>
                Player Statistics
              </CardTitle>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
              >
                <Badge variant="outline" className="capitalize text-sm px-3 py-1 bg-primary/5 text-primary border-primary/20">
                  {playerType === 'batsman' ? 'Batsman' : 'Bowler'}
                </Badge>
              </motion.div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              <CardDescription className="text-base">
                Comprehensive performance metrics for <span className="font-semibold text-foreground">{playerName}</span>
              </CardDescription>
            </motion.div>
          </CardHeader>
          <CardContent className="space-y-6">

            {/* Player Info Section */}
            <motion.div
              className="bg-gradient-to-r from-primary/8 to-primary/5 rounded-xl p-5 border-2 border-primary/15"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            >
              <div className="flex items-center gap-4 mb-4">
                <motion.div
                  className="h-12 w-12 bg-primary/15 rounded-full flex items-center justify-center"
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <User className="h-6 w-6 text-primary" />
                </motion.div>
                <div>
                  <motion.h3
                    className="font-bold text-xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.4 }}
                  >
                    {playerName}
                  </motion.h3>
                  <motion.p
                    className="text-base text-muted-foreground capitalize"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.4 }}
                  >
                    {playerType} Performance Analysis
                  </motion.p>
                </div>
              </div>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              className="grid grid-cols-2 gap-5"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {stats.mat !== undefined && (
                <motion.div
                  variants={statItemVariants}
                  whileHover={{ scale: 1.05, y: -3 }}
                  className="bg-gradient-to-br from-muted/40 to-muted/20 rounded-xl p-4 border-2 border-muted/30 hover:border-primary/30 hover:bg-muted/40 transition-all duration-200"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <motion.div
                      className="p-1.5 bg-muted/50 rounded-full"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Calendar className="h-5 w-5 text-muted-foreground" />
                    </motion.div>
                    <span className="text-sm font-semibold text-muted-foreground">Matches Played</span>
                  </div>
                  <motion.p
                    className="text-2xl font-bold text-foreground"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                  >
                    {formatNumber(stats.mat)}
                  </motion.p>
                </motion.div>
              )}

              {playerType === 'batsman' ? (
                <>
                  {stats.runs !== undefined && (
                    <motion.div
                      variants={statItemVariants}
                      whileHover={{ scale: 1.05, y: -3 }}
                      className="bg-gradient-to-br from-muted/40 to-muted/20 rounded-xl p-4 border-2 border-muted/30 hover:border-primary/30 hover:bg-muted/40 transition-all duration-200"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <motion.div
                          className="p-1.5 bg-muted/50 rounded-full"
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                        >
                          <Target className="h-5 w-5 text-muted-foreground" />
                        </motion.div>
                        <span className="text-sm font-semibold text-muted-foreground">Total Runs</span>
                      </div>
                      <motion.p
                        className="text-2xl font-bold text-foreground"
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                      >
                        {formatNumber(stats.runs)}
                      </motion.p>
                    </motion.div>
                  )}

                  <motion.div
                    variants={statItemVariants}
                    whileHover={{ scale: 1.05, y: -3 }}
                    className="bg-gradient-to-br from-muted/40 to-muted/20 rounded-xl p-4 border-2 border-muted/30 hover:border-primary/30 hover:bg-muted/40 transition-all duration-200"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <motion.div
                        className="p-1.5 bg-muted/50 rounded-full"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <TrendingUp className="h-5 w-5 text-muted-foreground" />
                      </motion.div>
                      <span className="text-sm font-semibold text-muted-foreground">Batting Average</span>
                    </div>
                    <motion.p
                      className="text-2xl font-bold text-foreground"
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                    >
                      {formatNumber(stats.avg, 2)}
                    </motion.p>
                  </motion.div>

                  <motion.div
                    variants={statItemVariants}
                    whileHover={{ scale: 1.05, y: -3 }}
                    className="bg-gradient-to-br from-muted/40 to-muted/20 rounded-xl p-4 border-2 border-muted/30 hover:border-primary/30 hover:bg-muted/40 transition-all duration-200"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <motion.div
                        className="p-1.5 bg-muted/50 rounded-full"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <Activity className="h-5 w-5 text-muted-foreground" />
                      </motion.div>
                      <span className="text-sm font-semibold text-muted-foreground">Strike Rate</span>
                    </div>
                    <motion.p
                      className="text-2xl font-bold text-foreground"
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                    >
                      {formatNumber(stats.sr, 2)}
                    </motion.p>
                  </motion.div>

                  {stats.fours !== undefined && (
                    <motion.div
                      variants={statItemVariants}
                      whileHover={{ scale: 1.05, y: -3 }}
                      className="bg-gradient-to-br from-muted/40 to-muted/20 rounded-xl p-4 border-2 border-muted/30 hover:border-primary/30 hover:bg-muted/40 transition-all duration-200"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <motion.div
                          className="p-1.5 bg-muted/50 rounded-full"
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                        >
                          <Award className="h-5 w-5 text-muted-foreground" />
                        </motion.div>
                        <span className="text-sm font-semibold text-muted-foreground">Fours</span>
                      </div>
                      <motion.p
                        className="text-2xl font-bold text-foreground"
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                      >
                        {formatNumber(stats.fours)}
                      </motion.p>
                    </motion.div>
                  )}

                  {stats.sixes !== undefined && (
                    <motion.div
                      variants={statItemVariants}
                      whileHover={{ scale: 1.05, y: -3 }}
                      className="bg-gradient-to-br from-muted/40 to-muted/20 rounded-xl p-4 border-2 border-muted/30 hover:border-primary/30 hover:bg-muted/40 transition-all duration-200"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <motion.div
                          className="p-1.5 bg-muted/50 rounded-full"
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                        >
                          <Zap className="h-5 w-5 text-muted-foreground" />
                        </motion.div>
                        <span className="text-sm font-semibold text-muted-foreground">Sixes</span>
                      </div>
                      <motion.p
                        className="text-2xl font-bold text-foreground"
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                      >
                        {formatNumber(stats.sixes)}
                      </motion.p>
                    </motion.div>
                  )}
                </>
              ) : (
                <>
                  {stats.wickets !== undefined && (
                    <motion.div
                      variants={statItemVariants}
                      whileHover={{ scale: 1.05, y: -3 }}
                      className="bg-gradient-to-br from-muted/40 to-muted/20 rounded-xl p-4 border-2 border-muted/30 hover:border-primary/30 hover:bg-muted/40 transition-all duration-200"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <motion.div
                          className="p-1.5 bg-muted/50 rounded-full"
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                        >
                          <Target className="h-5 w-5 text-muted-foreground" />
                        </motion.div>
                        <span className="text-sm font-semibold text-muted-foreground">Total Wickets</span>
                      </div>
                      <motion.p
                        className="text-2xl font-bold text-foreground"
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                      >
                        {formatNumber(stats.wickets)}
                      </motion.p>
                    </motion.div>
                  )}

                  <motion.div
                    variants={statItemVariants}
                    whileHover={{ scale: 1.05, y: -3 }}
                    className="bg-gradient-to-br from-muted/40 to-muted/20 rounded-xl p-4 border-2 border-muted/30 hover:border-primary/30 hover:bg-muted/40 transition-all duration-200"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <motion.div
                        className="p-1.5 bg-muted/50 rounded-full"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <BarChart3 className="h-5 w-5 text-muted-foreground" />
                      </motion.div>
                      <span className="text-sm font-semibold text-muted-foreground">Economy Rate</span>
                    </div>
                    <motion.p
                      className="text-2xl font-bold text-foreground"
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                    >
                      {formatNumber(stats.econ, 2)}
                    </motion.p>
                  </motion.div>

                  <motion.div
                    variants={statItemVariants}
                    whileHover={{ scale: 1.05, y: -3 }}
                    className="bg-gradient-to-br from-muted/40 to-muted/20 rounded-xl p-4 border-2 border-muted/30 hover:border-primary/30 hover:bg-muted/40 transition-all duration-200"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <motion.div
                        className="p-1.5 bg-muted/50 rounded-full"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <Activity className="h-5 w-5 text-muted-foreground" />
                      </motion.div>
                      <span className="text-sm font-semibold text-muted-foreground">Strike Rate</span>
                    </div>
                    <motion.p
                      className="text-2xl font-bold text-foreground"
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                    >
                      {formatNumber(stats.sr, 2)}
                    </motion.p>
                  </motion.div>
                </>
              )}
            </motion.div>

            {/* Enhanced Summary Section */}
            <motion.div
              className="bg-gradient-to-r from-primary/8 to-primary/5 rounded-xl p-5 border-2 border-primary/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            >
              <div className="flex items-center gap-3 mb-3">
                <motion.div
                  className="p-1.5 bg-primary/15 rounded-full"
                  animate={{
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    repeatDelay: 3
                  }}
                >
                  <Activity className="h-5 w-5 text-primary" />
                </motion.div>
                <span className="font-semibold text-lg text-primary">Performance Summary</span>
              </div>
              <motion.p
                className="text-base text-muted-foreground leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1, duration: 0.4 }}
              >
                {playerType === 'batsman'
                  ? `${playerName} demonstrates exceptional batting prowess with a strike rate of ${stats.sr?.toFixed(2)} and an impressive average of ${stats.avg?.toFixed(2)} across ${stats.mat || 0} matches.`
                  : `${playerName} showcases outstanding bowling skills, securing ${stats.wickets || 0} wickets with remarkable economy rate of ${stats.econ?.toFixed(2)} and strike rate of ${stats.sr?.toFixed(2)}.`
                }
              </motion.p>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
