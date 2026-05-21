-- One-time: map legacy blog categories to new filters
-- Run in Supabase SQL Editor after deploying category changes

UPDATE blog_posts SET category = 'Founder''s Story'
WHERE category IN ('Accounting Tips', 'Nepal Tax');

UPDATE blog_posts SET category = 'Team Story'
WHERE category IN ('Team Updates', 'Nepal');
