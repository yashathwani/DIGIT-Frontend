# Water Module for DIGIT UI

This module provides functionality to manage water connections in DIGIT.

## Features

1. Create new water connection applications
2. Search for existing water connections
3. View details of a water connection
4. Process water connections with workflow actions

## Pages

### Employee Interface

1. **Create Water Connection**
   - A form for creating new water connection applications
   - Captures applicant details, property information, and connection specifics

2. **Search Water Connection**
   - Search screen to find water connections by various parameters
   - Results displayed in a table with click-through to details

3. **Water Connection Details**
   - Detailed view of a water connection
   - Includes workflow actions for processing the application
   - Shows workflow history

## Installation

```bash
yarn add @egovernments/digit-ui-module-water
```

## Usage

To use this module in your DIGIT UI application, first add it to your dependencies, then import and register the Water module components:

```javascript
import { initWaterComponents } from "@egovernments/digit-ui-module-water";

// Register Water components
initWaterComponents();
```

Then add "Water" to the enabledModules array in your App.js file. 