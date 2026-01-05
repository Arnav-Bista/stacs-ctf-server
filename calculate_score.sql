WITH multipliers AS (select flag_id, 100.0 / count(flag_id) as multiplier from team_flags group by flag_id)
SELECT
  teams.id, 
  name,
  ROUND(SUM(points * multiplier),2) as score
FROM
  teams 
  INNER JOIN team_flags on team_flags.team_id = teams.id 
  INNER JOIN flags on team_flags.flag_id = flags.id
  INNER JOIN multipliers on team_flags.flag_id = multipliers.flag_id
GROUP BY 
  teams.id
ORDER BY 
  score
DESC;
