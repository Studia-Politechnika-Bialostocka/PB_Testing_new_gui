build:
	rm -rf dist
	cp steps/common_steps.py src/preparation/common_steps_copy.py
	python3 setup.py develop
	python3 -m build
push_test:
	python3 -m twine upload --repository testpypi dist/*
push_prod:
	python3 -m twine upload --repository pypi dist/*
