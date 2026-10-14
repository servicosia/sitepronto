import os
import shutil
import zipfile

def sync_bundle(base_dir):
    next_dir = os.path.join(base_dir, ".next")
    bundle_dir = os.path.join(base_dir, "next_bundle")
    
    if os.path.exists(bundle_dir):
        shutil.rmtree(bundle_dir)
        
    def ignore_cache(path, names):
        return ["cache"] if "cache" in names else []
        
    shutil.copytree(next_dir, bundle_dir, ignore=ignore_cache)
    print("next_bundle sincronizado com .next com sucesso!")

def create_zip():
    base_dir = r"d:\APPS\SitePronto"
    sync_bundle(base_dir)
    zip_path = os.path.join(base_dir, "deploy.zip")
    
    if os.path.exists(zip_path):
        os.remove(zip_path)

    include_files = [
        ".shardcloud",
        "package.json",
        "package-lock.json",
        "next.config.js",
        "postcss.config.js",
        "tailwind.config.ts",
        "tsconfig.json",
        "README.md",
    ]

    include_dirs = [
        "prisma",
        "src",
        "next_bundle",
        "data",
    ]

    with zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_DEFLATED) as zf:
        for fname in include_files:
            fpath = os.path.join(base_dir, fname)
            if os.path.isfile(fpath):
                # Always forward slash
                zf.write(fpath, arcname=fname)
                print(f"Added file: {fname}")

        for dname in include_dirs:
            dpath = os.path.join(base_dir, dname)
            if not os.path.isdir(dpath):
                continue
            for root, dirs, files in os.walk(dpath):
                # Skip cache directory
                if ".next\\cache" in root or ".next/cache" in root:
                    continue
                for file in files:
                    full_path = os.path.join(root, file)
                    rel_path = os.path.relpath(full_path, base_dir)
                    # Convert to posix path (forward slashes)
                    arcname = rel_path.replace("\\", "/")
                    zf.write(full_path, arcname=arcname)

    size_mb = os.path.getsize(zip_path) / (1024 * 1024)
    print(f"\nZip criado com sucesso: {zip_path} ({size_mb:.2f} MB)")

if __name__ == "__main__":
    create_zip()
