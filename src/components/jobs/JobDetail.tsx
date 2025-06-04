
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { fetchJobById, saveJob, unsaveJob } from '../../store/jobsSlice';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Calendar, 
  Users, 
  Briefcase, 
  DollarSign, 
  Clock, 
  CheckCircle, 
  ExternalLink, 
  Share2,
  Bookmark,
  BookmarkCheck,
  ArrowLeft
} from 'lucide-react';
import { useToast } from '../../hooks/use-toast';

const JobDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { currentJob, loading, savedJobs } = useSelector((state: RootState) => state.jobs);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const userRole = useSelector((state: RootState) => state.auth.user?.role);
  const { toast } = useToast();
  
  const isSaved = currentJob ? savedJobs.includes(currentJob.id) : false;

  useEffect(() => {
    if (id) {
      dispatch(fetchJobById(id));
    }
    
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Clean up when component unmounts
    return () => {
      // Reset current job when leaving the page
    };
  }, [id, dispatch]);

  const handleSaveToggle = () => {
    if (!isAuthenticated) {
      toast({
        title: 'Authentication required',
        description: 'Please log in to save jobs',
        variant: 'default',
      });
      return;
    }
    
    if (!currentJob) return;
    
    if (isSaved) {
      dispatch(unsaveJob(currentJob.id));
      toast({
        title: 'Job removed',
        description: 'Job removed from saved jobs',
      });
    } else {
      dispatch(saveJob(currentJob.id));
      toast({
        title: 'Job saved',
        description: 'Job added to saved jobs',
      });
    }
  };

  const handleApply = () => {
    if (!isAuthenticated) {
      toast({
        title: 'Authentication required',
        description: 'Please log in to apply for jobs',
        variant: 'default',
      });
      return;
    }
    
    if (userRole === 'employer') {
      toast({
        title: 'Action not allowed',
        description: 'Employers cannot apply for jobs',
        variant: 'destructive',
      });
      return;
    }
    
    toast({
      title: 'Application submitted',
      description: 'Your application has been successfully submitted',
    });
  };

  const handleShare = () => {
    if (navigator.share && currentJob) {
      navigator.share({
        title: `${currentJob.title} at ${currentJob.company}`,
        text: `Check out this job: ${currentJob.title} at ${currentJob.company}`,
        url: window.location.href,
      }).catch((error) => console.log('Error sharing', error));
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: 'Link copied',
        description: 'Job link copied to clipboard',
      });
    }
  };

  // Format date to readable format
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto animate-pulse">
          <div className="h-8 bg-accent/20 rounded-lg w-3/4 mb-4"></div>
          <div className="h-6 bg-accent/20 rounded-lg w-1/2 mb-8"></div>
          <div className="h-4 bg-accent/20 rounded-lg w-full mb-2"></div>
          <div className="h-4 bg-accent/20 rounded-lg w-full mb-2"></div>
          <div className="h-4 bg-accent/20 rounded-lg w-3/4 mb-8"></div>
          <div className="h-6 bg-accent/20 rounded-lg w-1/3 mb-4"></div>
          <div className="h-4 bg-accent/20 rounded-lg w-full mb-2"></div>
          <div className="h-4 bg-accent/20 rounded-lg w-full mb-2"></div>
          <div className="h-4 bg-accent/20 rounded-lg w-5/6 mb-8"></div>
        </div>
      </div>
    );
  }

  if (!currentJob) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Job not found</h2>
          <p className="text-muted-foreground mb-6">The job you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={() => navigate('/jobs')}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            Browse all jobs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 pt-20 pb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-muted-foreground hover:text-foreground mb-6 group transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-1 group-hover:-translate-x-1 transition-transform" />
          Back to jobs
        </button>

        <div className="glass-card rounded-2xl overflow-hidden mb-8">
          <div className="p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-4">
                <div className="relative flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden bg-accent/10">
                  {currentJob.logo ? (
                    <img
                      src={currentJob.logo}
                      alt={`${currentJob.company} logo`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary font-bold text-2xl">
                      {currentJob.company.charAt(0)}
                    </div>
                  )}
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">{currentJob.title}</h1>
                  <p className="text-lg text-muted-foreground">{currentJob.company}</p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 sm:justify-end">
                <button
                  onClick={handleSaveToggle}
                  className={`inline-flex items-center space-x-2 px-4 py-2 rounded-lg border ${
                    isSaved 
                      ? 'bg-primary/10 border-primary/20 text-primary' 
                      : 'border-border hover:border-primary/20 hover:bg-accent/5'
                  } transition-colors`}
                >
                  {isSaved ? (
                    <>
                      <BookmarkCheck className="h-5 w-5" />
                      <span>Saved</span>
                    </>
                  ) : (
                    <>
                      <Bookmark className="h-5 w-5" />
                      <span>Save</span>
                    </>
                  )}
                </button>
                
                <button
                  onClick={handleShare}
                  className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg border border-border hover:border-primary/20 hover:bg-accent/5 transition-colors"
                >
                  <Share2 className="h-5 w-5" />
                  <span>Share</span>
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="flex items-center text-muted-foreground">
                <MapPin className="h-5 w-5 mr-2 text-primary" />
                <span>{currentJob.location}</span>
              </div>
              
              <div className="flex items-center text-muted-foreground">
                <Briefcase className="h-5 w-5 mr-2 text-primary" />
                <span>{currentJob.type}</span>
              </div>
              
              <div className="flex items-center text-muted-foreground">
                <Calendar className="h-5 w-5 mr-2 text-primary" />
                <span>Posted {formatDate(currentJob.postedDate)}</span>
              </div>
              
              {currentJob.salary && (
                <div className="flex items-center text-muted-foreground">
                  <DollarSign className="h-5 w-5 mr-2 text-primary" />
                  <span>{currentJob.salary}</span>
                </div>
              )}
              
              {currentJob.applicants !== undefined && (
                <div className="flex items-center text-muted-foreground">
                  <Users className="h-5 w-5 mr-2 text-primary" />
                  <span>{currentJob.applicants} applicants</span>
                </div>
              )}
              
              <div className="flex items-center text-muted-foreground">
                <Clock className="h-5 w-5 mr-2 text-primary" />
                <span>Apply before July 30, 2023</span>
              </div>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Job Description</h2>
              <p className="text-muted-foreground whitespace-pre-line mb-6">
                {currentJob.description}
              </p>
              
              <p className="text-muted-foreground mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, eros vel bibendum commodo, nisl nunc aliquet nunc, euismod aliquam nunc nisl euismod. Sed euismod, eros vel bibendum commodo, nisl nunc aliquet nunc, euismod aliquam nunc nisl euismod.
              </p>
              
              <p className="text-muted-foreground">
                Sed euismod, eros vel bibendum commodo, nisl nunc aliquet nunc, euismod aliquam nunc nisl euismod. Sed euismod, eros vel bibendum commodo, nisl nunc aliquet nunc, euismod aliquam nunc nisl euismod.
              </p>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Requirements</h2>
              <ul className="space-y-2">
                {currentJob.requirements.map((requirement, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 mr-2 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{requirement}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">About {currentJob.company}</h2>
              <p className="text-muted-foreground mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, eros vel bibendum commodo, nisl nunc aliquet nunc, euismod aliquam nunc nisl euismod. Sed euismod, eros vel bibendum commodo, nisl nunc aliquet nunc, euismod aliquam nunc nisl euismod.
              </p>
              
              <a
                href="#"
                className="inline-flex items-center text-primary hover:text-primary/90 transition-colors"
              >
                Visit company website <ExternalLink className="h-4 w-4 ml-1" />
              </a>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleApply}
                className="flex-1 sm:flex-none sm:w-auto px-6 py-3 rounded-xl bg-[#ffa500] hover:bg-[#ffa500] text-primary-foreground font-medium hover:bg-primary/90 transition-colors shadow-sm"
              >
                Apply Now
              </motion.button>
              
              <button
                onClick={handleSaveToggle}
                className={`flex-1 sm:flex-none sm:w-auto px-6 py-3 rounded-xl ${
                  isSaved 
                    ? 'bg-primary/10 text-primary' 
                    : 'bg-accent/10 text-accent-foreground hover:bg-accent/20'
                } font-medium transition-colors`}
              >
                {isSaved ? 'Saved' : 'Save for Later'}
              </button>
            </div>
          </div>
        </div>
        
        {/* Similar jobs section could be added here */}
      </motion.div>
    </div>
  );
};

export default JobDetail;
