
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Clock, Users, Bookmark, BookmarkCheck } from 'lucide-react';
import { Job } from '../../store/jobsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { saveJob, unsaveJob } from '../../store/jobsSlice';
import { useToast } from '../../hooks/use-toast';

interface JobCardProps {
  job: Job;
  index?: number;
  featured?: boolean;
}

const JobCard: React.FC<JobCardProps> = ({ job, index = 0, featured = false }) => {
  const dispatch = useDispatch();
  const savedJobs = useSelector((state: RootState) => state.jobs.savedJobs);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const { toast } = useToast();
  
  const isSaved = savedJobs.includes(job.id);
  
  const handleSaveToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isAuthenticated) {
      toast({
        title: 'Authentication required',
        description: 'Please log in to save jobs',
        variant: 'default',
      });
      return;
    }
    
    if (isSaved) {
      dispatch(unsaveJob(job.id));
      toast({
        title: 'Job removed',
        description: 'Job removed from saved jobs',
      });
    } else {
      dispatch(saveJob(job.id));
      toast({
        title: 'Job saved',
        description: 'Job added to saved jobs',
      });
    }
  };

  // Format date to relative time
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    return `${Math.floor(diffInDays / 30)} months ago`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Link to={`/jobs/${job.id}`} className="block h-full">
        <div 
          className={`h-full ${
            featured
              ? 'glass-card border-primary/20 hover:border-primary/40'
              : 'bg-background border border-border hover:border-primary/20'
          } rounded-xl p-5 transition-all duration-300 hover:shadow-md hover:translate-y-[-2px]`}
        >
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-4">
              <div className="relative flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden bg-accent/10">
                {job.logo ? (
                  <img
                    src={job.logo}
                    alt={`${job.company} logo`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary font-bold text-lg">
                    {job.company.charAt(0)}
                  </div>
                )}
              </div>
              <div>
                <h3 className="font-semibold text-foreground line-clamp-1">{job.title}</h3>
                <p className="text-sm text-muted-foreground">{job.company}</p>
              </div>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSaveToggle}
              className="text-muted-foreground hover:text-primary transition-colors p-1 rounded-full hover:bg-primary/5"
            >
              {isSaved ? (
                <BookmarkCheck className="h-5 w-5 text-primary" />
              ) : (
                <Bookmark className="h-5 w-5" />
              )}
            </motion.button>
          </div>
          
          <div className="mt-4 space-y-2">
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                {job.type}
              </span>
              
              {job.salary && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent/10 text-accent-foreground">
                  {job.salary}
                </span>
              )}
              
              {job.isFeatured && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                  Featured
                </span>
              )}
            </div>
            
            <p className="text-sm text-muted-foreground line-clamp-2 h-10">
              {job.description}
            </p>
            
            <div className="flex items-center justify-between pt-3 text-sm text-muted-foreground">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                <span className="line-clamp-1">{job.location}</span>
              </div>
              
              <div className="flex items-center space-x-4">
                {job.applicants !== undefined && (
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    <span>{job.applicants} applicants</span>
                  </div>
                )}
                
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{formatDate(job.postedDate)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default JobCard;
