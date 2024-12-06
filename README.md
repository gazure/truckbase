To run docker-compose up:

1. Open a terminal and navigate to the directory containing your docker-compose.yml file

2. Run the following command:
   ```
   docker-compose up
   ```

3. Add the -d flag to run in detached mode (background):
   ```
   docker-compose up -d
   ```

4. To stop containers:
   ```
   docker-compose down
   ```


Check docker-compose.yml for port mappings to access locations via 0.0.0.0

Common options:
- `--build` - Rebuild images before starting containers
- `--force-recreate` - Recreate containers even if config unchanged
- `-v` - Remove named volumes declared in the volumes section
