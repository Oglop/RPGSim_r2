const {ENUM_EXPLORE_DIR, ENUM_EXPLORE_STATUS} = require('../generic/enums') 

const checkPossibleGoal = (map, position) => {
  if (map[position.x][position.y].exploreStatus == ENUM_EXPLORE_STATUS.obstacle) { return false }
  return true
}

/**
 * 
 * 
 * @param {Array} map 
 * @param {object} point 
 */
const resetQuestGoal = (map, point) => {
  if (map[point.y][point.x].exploreStatus === ENUM_EXPLORE_STATUS.goal) { map[point.y][point.x].exploreStatus = ENUM_EXPLORE_STATUS.empty }
  else { 
    for (let y = 0; y < map.length; y++) {
      for (let x = 0; x < map.length; x++) {
        if (map[point.x][point.y].exploreStatus != ENUM_EXPLORE_STATUS.obstacle) {
          map[point.x][point.y].exploreStatus = ENUM_EXPLORE_STATUS.empty
        }
      }
    }
  }
}

/**
 * 
 * @param {object} point {x,y}
 * @param {array[,]} grid 
 * @param {object} goal {x,y}
 * @returns boolean
 */
const findShortestPath = (point, grid, goal) => {
    var distanceFromTop = point.y;
    var distanceFromLeft = point.x;
    grid[goal.y][goal.x].exploreStatus = ENUM_EXPLORE_STATUS.goal
  
    // Each "location" will store its coordinates
    // and the shortest path required to arrive there
    var location = {
      distanceFromTop: distanceFromTop,
      distanceFromLeft: distanceFromLeft,
      path: [],
      status: ENUM_EXPLORE_STATUS.start
    };
  
    // Initialize the queue with the start location already inside
    var queue = [location];
  
    // Loop through the grid searching for the goal
    while (queue.length > 0) {
      // Take the first location off the queue
      var currentLocation = queue.shift();
  
      // Explore North
      var newLocation = exploreInDirection(currentLocation, ENUM_EXPLORE_DIR.north, grid);
      if (newLocation.status === ENUM_EXPLORE_STATUS.goal) {
        return newLocation.path;
      } else if (newLocation.status === ENUM_EXPLORE_STATUS.valid) {
        queue.push(newLocation);
      }
  
      // Explore East
      var newLocation = exploreInDirection(currentLocation, ENUM_EXPLORE_DIR.east, grid);
      if (newLocation.status === ENUM_EXPLORE_STATUS.goal) {
        return newLocation.path;
      } else if (newLocation.status === ENUM_EXPLORE_STATUS.valid) {
        queue.push(newLocation);
      }
  
      // Explore South
      var newLocation = exploreInDirection(currentLocation, ENUM_EXPLORE_DIR.south, grid);
      if (newLocation.status === ENUM_EXPLORE_STATUS.goal) {
        return newLocation.path;
      } else if (newLocation.status === ENUM_EXPLORE_STATUS.valid) {
        queue.push(newLocation);
      }
  
      // Explore West
      var newLocation = exploreInDirection(currentLocation, ENUM_EXPLORE_DIR.west, grid);
      if (newLocation.status === ENUM_EXPLORE_STATUS.goal) {
        return newLocation.path;
      } else if (newLocation.status === ENUM_EXPLORE_STATUS.valid) {
        queue.push(newLocation);
      }
    }
  
    // No valid path found
    return false;
  
  };
  
  // This function will check a location's status
  // (a location is "valid" if it is on the grid, is not an "obstacle",
  // and has not yet been visited by our algorithm)
  // Returns "Valid", "Invalid", "Blocked", or "Goal"
  const locationStatus = (location, grid) => {
    var gridSize = grid.length;
    var dft = location.distanceFromTop;
    var dfl = location.distanceFromLeft;
  
    if (location.distanceFromLeft < 0 ||
        location.distanceFromLeft >= gridSize ||
        location.distanceFromTop < 0 ||
        location.distanceFromTop >= gridSize) {
  
      // location is not on the grid--return false
      return ENUM_EXPLORE_STATUS.invalid;
    } else if (grid[dft][dfl].exploreStatus === ENUM_EXPLORE_STATUS.goal) {
      return ENUM_EXPLORE_STATUS.goal;
    } else if (grid[dft][dfl].exploreStatus !== ENUM_EXPLORE_STATUS.empty) {
      // location is either an obstacle or has been visited
      return ENUM_EXPLORE_STATUS.blocked;
    } else {
      return ENUM_EXPLORE_STATUS.valid;
    }
  };
  
  
  // Explores the grid from the given location in the given
  // direction
  const exploreInDirection = (currentLocation, direction, grid) => {
    var newPath = currentLocation.path.slice();
    newPath.push(direction);
  
    var dft = currentLocation.distanceFromTop;
    var dfl = currentLocation.distanceFromLeft;
  
    if (direction === ENUM_EXPLORE_DIR.north) {
      dft -= 1;
    } else if (direction === ENUM_EXPLORE_DIR.east) {
      dfl += 1;
    } else if (direction === ENUM_EXPLORE_DIR.south) {
      dft += 1;
    } else if (direction === ENUM_EXPLORE_DIR.west) {
      dfl -= 1;
    }
  
    var newLocation = {
      distanceFromTop: dft,
      distanceFromLeft: dfl,
      path: newPath,
      status: ENUM_EXPLORE_STATUS.unknown
    };
    newLocation.status = locationStatus(newLocation, grid);
  
    // If this new location is valid, mark it as 'Visited'
    if (newLocation.status === ENUM_EXPLORE_STATUS.valid) {
      grid[newLocation.distanceFromTop][newLocation.distanceFromLeft].exploreStatus = ENUM_EXPLORE_STATUS.visited;
    }
  
    return newLocation;
  };
  
  module.exports = {
    findShortestPath,
    checkPossibleGoal,
    resetQuestGoal
  }